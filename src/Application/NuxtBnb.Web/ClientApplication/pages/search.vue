<template>
  <div>
    <div>Results for: {{ label }}</div>
    <div ref="map" style="height: 100vh; width: 60vw; float: right"></div>
    <div v-if="homes.length > 0">
      <nuxt-link
        v-for="home in homes"
        :key="home.objectID"
        :to="`/home/${home.objectID}`"
      >
        <home-row
          :home="home"
          @mouseover.native="highlightMarker(home.objectID, true)"
          @mouseout.native="highlightMarker(home.objectID, false)"
        />
      </nuxt-link>
    </div>
    <div v-else>
      <h1>No results found!</h1>
    </div>
  </div>
</template>
<script>
import HomeRow from '../components/HomeRow.vue';
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
  watchQuery: ['lat'],
  mounted() {
    this.showMap();
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle('marker-highlight', isHighlighted);
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