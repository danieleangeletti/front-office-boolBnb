<script>
import axios from "axios";
import { store } from "../../store.js";
export default {
  data() {
    return {
      userSearch: "",
      store,
      firstApi: null,
      appartmentLat: [],
      appartmentLon: [],
      poilist: [],
      jsonPoilist: null,
    };
  },
  methods: {
    searchApartment() {
      for (let i = 0; i < 20; i++) {
        if (
          this.store.apartments[i].latitude &&
          this.store.apartments[i].longitude != null
        ) {
          this.appartmentLat.push(this.store.apartments[i].latitude);
          this.appartmentLon.push(this.store.apartments[i].longitude);
        }
      }
      // console.log(this.store.apartments)
      // console.log(this.appartmentLat)
      // console.log(this.appartmentLon)

      axios
        .get(
          "https://api.tomtom.com/search/2/geocode/.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
          {
            params: {
              query: this.userSearch,
            },
          }
        )
        .then((responseOne) => {
          console.log(responseOne)
          this.firstApi = responseOne.data.results[0].position;

          for (let i = 0; i < 20; i++) {
            if (
              this.store.apartments[i].latitude &&
              this.store.apartments[i].longitude != null
            ) {
              this.poilist.push({
                "poi": {
                  'name': this.store.apartments[i].name,
                },
                "address": {
                 ' freeformAddress': this.store.apartments[i].address,
                },
                "position": {
                  'lat': parseFloat(this.store.apartments[i].latitude),
                  'lon': parseFloat(this.store.apartments[i].longitude)
                },
              });
            }
          }
          // via monte napoleone milano

          this.jsonPoilist = JSON.stringify(this.poilist);
          console.log(this.jsonPoilist)
          console.log(this.firstApi.lat, this.firstApi.lon , typeof this.firstApi.lat ,typeof this.firstApi.lon)
          axios
            .get('https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"'+ this.firstApi.lat +', '+ this.firstApi.lon+ '", "radius":20000}]', {
              params: {
                key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",
                //  geometryList: [
                //    {
                //      "type": "CIRCLE",
                //      "position": `${this.firstApi.lat}, ${this.firstApi.lon}`,
                //      "radius": 100,
                //    },
                //  ],
                poiList: this.jsonPoilist
              },
            })
            .then((response) => {
              console.log(response.data);
            });
        });
    },
  },
};
</script>

<template>
  <header class="container-fluid text-center">
    <div class="row justify-content-between align-items-center h-100">
      <div class="col">
        <div class="img-box">
          <img src="" alt="logo BoolBnb" />
        </div>
      </div>
      <div class="col">
        <router-link class="router-link" :to="{ name: 'Home-page' }"
          >Home</router-link
        >
        <router-link class="router-link" :to="{ name: 'advanced-search' }"
          >Ricerca avanzata</router-link
        >
      </div>
      <div class="col">login Placeholder</div>
      <div class="col-12">
        <form @submit.prevent>
          <input v-model="userSearch" type="text" />
          <button @click="searchApartment" class="btn btn-outline-dark m-2">
            cerca
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

header {
  height: 10vh;
  border-bottom: 1px solid lightgrey;
  .router-link {
    padding: 1rem 2rem;
    color: #717171;
    text-decoration: none;
    border-radius: 30px;
  }
}
</style>
