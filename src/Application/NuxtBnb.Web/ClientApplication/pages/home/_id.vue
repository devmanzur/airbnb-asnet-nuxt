<template>
  <div class="app-container">
    <property-gallery :images="home.images" />
    <property-details :home="home" />
    <property-description :home="home" />
    <property-map :home="home"></property-map>
    <property-reviews :reviews="reviews" />
    <property-host :user="user" />
  </div>
</template>
<script>
import formatDate from "~/utils/formatDate";
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
  methods: {
    formatDate,
  },
};
</script>
