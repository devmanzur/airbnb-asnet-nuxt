<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" alt="" />
      </div>
      <div class="app-search">
        <input
          ref="citySearch"
          type="text"
          placeholder="Enter Location"
          @placeChanged="placeChanged"
        />
        <input type="text" placeholder="Check in" class="datepicker" />
        <input type="text" placeholder="Check out" class="datepicker" />
        <button>
          <img src="/images/icons/search.svg"/>
        </button>
      </div>
    </header>
    <header style="background-color: #eeeeee"></header>
    <nuxt-link to="/">Home</nuxt-link>

    <nuxt></nuxt>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initAutoComplete();
  },
  methods: {
    initAutoComplete() {
      this.$maps.makeAutoComplete(this.$refs.citySearch);
    },
    placeChanged(event) {
      const place = event.detail;
      if (!place || !place.geometry) {
        return;
      }
      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      });
    },
  },
};
</script>