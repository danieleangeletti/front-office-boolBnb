<script>
import ApartmentComponent from '../components/ApartmentComponent.vue';
import FilteredApartmentComponent from '../components/FilteredApartmentComponent.vue';
import axios from 'axios';
import { store } from "../../store.js";
export default {
    data(){
        return{
            store,
            userSearch: "",
            appartmentLat: [],
            appartmentLon: [],
            firstApi: null,
            poilist: [],
            jsonPoilist: null,
            apartmentName: [],
        }
    },  
    methods: {
        callTheApartmentsNormal(){
            axios
            .get('http://localhost:8000/api/apartments',{
                params:{
                   
                }
            })
            .then(response=>{
                this.store.apartments = response.data.result;
                // console.log(this.apartments)
                // console.log(response)
            })
        },
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
          // console.log(responseOne)
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
          // console.log(this.jsonPoilist)
          // console.log(this.firstApi.lat, this.firstApi.lon , typeof this.firstApi.lat ,typeof this.firstApi.lon)
          axios
            .get('https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"'+ this.firstApi.lat +', '+ this.firstApi.lon+ '", "radius":20000}]', {
              params: {
                key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",

                poiList: this.jsonPoilist
              },
            })
            .then((responseThree) => {
              
              let myData = responseThree.data.results;
              for(let i = 0; i < myData.length ; i ++){
                this.apartmentName.push(myData[i]['poi'].name) 
              }
              console.log(this.apartmentName)
                  axios
               .get('http://localhost:8000/api/getApartments',{
                   params:{
                      allName : this.apartmentName
                   }
               })
               .then(response=>{
                console.log(response)
                this.store.FilteredApartments = response.data.result;
                this.store.apartments = [];
               })
            });
        });
    },
    },
    components:{
        ApartmentComponent,
        FilteredApartmentComponent
    },
    mounted(){
        this.callTheApartmentsNormal();
    }
}
</script>

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent>
              <div class="d-flex justify-content-center">
                  <input v-model="userSearch" type="text" />
                  <button @click="searchApartment" class="btn btn-outline-dark m-2">
                      SEARCH
                  </button>
              </div>
          </form>
        </div>
        <div v-if="store.FilteredApartments.length === 0" class="col d-flex flex-wrap">
          <ApartmentComponent  v-for="(elem,i) in store.apartments" :apartment="elem" :key="i"/>
        </div>
        <div v-if="store.FilteredApartments.length != 0" class="col d-flex flex-wrap">
          <FilteredApartmentComponent v-for="(elem,j) in store.FilteredApartments" :apartment="elem" :key="j"/>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
           