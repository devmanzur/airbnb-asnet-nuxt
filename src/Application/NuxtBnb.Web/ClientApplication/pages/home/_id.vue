<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" width="20" height="20" />{{
      home.location.address
    }}
    {{ home.location.city }} {{ home.location.state }} {{ home.location.country
    }}<br />
    <img src="/images/star.svg" width="20" height="20" />{{ home.reviewValue }}
    <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath<br />
    {{ home.description }}
    <div ref="map" style="height: 800px; width: 800px"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" /><br />
      {{ review.reviewer.name }}<br />
      {{ formatDate(review.date) }} <br />
      <short-text :text="review.comment" :target="150" /><br />
    </div>
    <img :src="user.image" /><br />
    {{ user.name }} <br />
    {{ formatDate(user.joined) }} <br />
    {{ user.reviewCount }} <br />
    {{ user.description }} <br />
  </div>
</template>
<script>
export default {
  async asyncData({ error, params, $dataApi }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviews(params.id),
      $dataApi.getUsers(params.id),
    ]);

    const badResponse = responses.find((x) => !x.isSuccess);
    if (badResponse) {
      return error({ statusCode: 404, message: badResponse.message });
    }
    const getHomes = responses[0];

    const getReviews = responses[1];

    const getUsers = responses[2];

    return {
      home: getHomes.data,
      reviews: getReviews.data.hits,
      user: getUsers.data.hits[0],
    };
  },
  data() {
    return {
      home: {},
      reviews: [],
      user: {},
    };
  },
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.home._geoloc.lat,
        this.home._geoloc.lng
      );
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      });
    },
  },
};
</script>
