<script>
import ApartmentComponent from '../components/ApartmentComponent.vue';
import FilteredApartmentComponent from '../components/FilteredApartmentComponent.vue';
import axios from 'axios';
import { store } from "../../store.js";
export default {
    data(){
        return{
            store,
         
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
                 for (let i = 0; i < 20; i++) {
                if (
                  this.store.apartments[i].latitude &&
                  this.store.apartments[i].longitude != null
                ) {
                  this.store.poilist.push({
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

              this.store.jsonPoilist = JSON.stringify(this.store.poilist);
            })
        },
        searchApartment() {
          for (let i = 0; i < 20; i++) {
            if (
              this.store.apartments[i].latitude &&
              this.store.apartments[i].longitude != null
            ) {
              this.store.appartmentLat.push(this.store.apartments[i].latitude);
              this.store.appartmentLon.push(this.store.apartments[i].longitude);
            }
          }

          axios
            .get(
              "https://api.tomtom.com/search/2/geocode/.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
              {
                params: {
                  query: this.store.userSearch,
                },
              }
            )
            .then((responseOne) => {
              this.store.firstApi = responseOne.data.results[0].position;

             
              axios
                .get('https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"'+ this.store.firstApi.lat +', '+ this.store.firstApi.lon+ '", "radius":20000}]', {
                  params: {
                    key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",

                    poiList: this.store.jsonPoilist
                  },
                })
                .then((responseThree) => {
                  
                  let myData = responseThree.data.results;
                  for(let i = 0; i < myData.length ; i ++){
                    this.store.apartmentName.push(myData[i]['poi'].name) 
                  }
                      axios
                  .get('http://localhost:8000/api/getApartments',{
                      params:{
                          allName : this.store.apartmentName
                      }
                  })
                  .then(response=>{
                    this.store.FilteredApartments = response.data.result;
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
          
          <div class="d-flex justify-content-center">
              <input class="form-control my-2 user-search" v-model="store.userSearch" type="text" />
              <router-link :to="{ name: 'advanced-search' }" @click="searchApartment" class="btn btn-outline-dark m-2">
                  SEARCH
              </router-link>
          </div>
          
        </div>

        <div v-if="store.FilteredApartments.length === 0" class="col d-flex flex-wrap">
          <ApartmentComponent  v-for="(elem,i) in store.apartments" :apartment="elem" :key="i"/>
        </div>

      </div>
    </div>
</template>

<style lang="scss" scoped>
  .user-search{
    width: 400px;
  }
</style>
           