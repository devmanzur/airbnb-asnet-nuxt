<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Stays in {{ label }}</h2>
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <home-row
            class="app-house"
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
        </nuxt-link>
      </div>
      <div class="app-search-results-map">
        <div class="app-map" ref="map"></div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeRow from "../components/HomeRow.vue";
export default {
  components: { HomeRow },
  async asyncData({ query, $dataApi }) {
    const response = await $dataApi.getHomes(query.lat, query.lng);
    return {
      label: query.label,
      lat: query.lat,
      lng: query.lng,
      homes: response.data.hits,
    };
  },
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
  watch: {
    homes(oldData, newData) {
      this.showMap();
    },
  },
  watchQuery: ["lat"],
  mounted() {
    this.showMap();
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle("marker-highlight", isHighlighted);
    },
    showMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      );
    },
    getHomeMarkers() {
      if (this.homes.length == 0) {
        return null;
      }
      return this.homes.map((home) => {
        return {
          ...home._geoloc,
          label: home.pricePerNight,
          id: home.objectID,
        };
      });
    },
  },
};
</script>
<style>
.marker {
  background-color: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}
.marker-highlight {
  color: white;
  background-color: gold;
  border-color: goldenrod;
}
</style>