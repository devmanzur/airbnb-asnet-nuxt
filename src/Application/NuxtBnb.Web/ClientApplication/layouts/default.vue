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
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img :src="user.imageUrl" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8"></div>
      </div>
    </header>
    <nuxt />
  </div>
</template>
<script>
export default {
  name: "defaultLayout",
  mounted() {
    this.initAutoComplete();
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
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
        name: "search",
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