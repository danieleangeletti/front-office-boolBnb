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
             //faccio la prima chiamata al mio backend per ricevere tutti gli appartamenti del database
            .get('http://localhost:8000/api/apartments',{               
                params:{
                   
                }
            })
            .then(response=>{
              //Inserisco la risposta in una variabile nello store
                this.store.apartments = response.data.result;

              //Preparo una lista di appartamenti (in questo caso 25 perchè tomtom non vuole strighe troppo lunghe)
              //nel formato specificato nella documentazione di tomtom
                 for (let i = 0; i < 25; i++) {
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
              //trasformo la lista di POI creata in precedenza in una stringa JSON
              this.store.jsonPoilist = JSON.stringify(this.store.poilist);
            })
        },
        searchApartment() {

          axios
           // Faccio la prima chiamata API a tomtom e faccio trasformare l'input dell'utente in latitudine e longitudine                           
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

            //Faccio la seconda chiamata a tomtom dove specifico: 1-tipo di figura geometrica da usare come forma per il filtraggio
                    //                                            2-chiave API personale presa dal sito di tomtom
                    //                                            3-La lista di Appartamenti da filtrare in formato JSON
              axios
                .get('https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"'+ this.store.firstApi.lat +', '+ this.store.firstApi.lon+ '", "radius":20000}]', {
                  params: {
                    key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",

                    poiList: this.store.jsonPoilist
                  },
                })
                .then((responseThree) => {
                  
                  let myData = responseThree.data.results;
                //  Dichiaro e uso una variabile dove pusho tutti i nomi presi dalla risposta alla precedente chiamata api di tomtom
                  for(let i = 0; i < myData.length ; i ++){
                    this.store.apartmentName.push(myData[i]['poi'].name) 
                  }
              axios
                // Faccio una terza chiamata, questa volta al mio backend, che mi cerchera nel database gli appartamenti che corrispondono a quei nomi      
                  .get('http://localhost:8000/api/getApartments',{
                      params:{
                          allName : this.store.apartmentName
                      }
                  })
                  .then(response=>{
                // Inserisco    
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
           