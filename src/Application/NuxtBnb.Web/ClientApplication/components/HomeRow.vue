<template>
  <div style="clear: left">
    <img
      :src="home.images[0]"
      style="width: 200px; float: left; padding: 10px"
    />
    <br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state
    }}<br />
    {{ pluralize(home.guests, 'guest') }},
    {{ pluralize(home.rooms, 'room') }},
    {{ pluralize(home.beds, 'bed') }}, {{ pluralize(home.bathrooms,'bath') }}<br />
    <img src="/images/star.svg" width="20" height="20" />{{ home.reviewValue }}
    {{ home.reviewCount }} <br />

    {{ home.pricePerNight }} / night <br />
  </div>
</template>

<script>
export default { 
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  
  methods: {
    pluralize(count, singularWord) {
      const text = `${count} ${singularWord}`;
      if (count > 1) {
        return text + 's';
      }
      return text;
    },
  },
};
</script>