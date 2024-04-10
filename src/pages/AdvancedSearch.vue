<script>
import axios from 'axios';
import { store } from '../../store';
import AppHeader from '../components/AppHeader.vue';
import AppMain from '../components/AppMain.vue';
import AppFooter from '../components/AppFooter.vue';
import FilteredApartmentComponent from '../components/FilteredApartmentComponent.vue';
export default {
    data() {
        return {
            store,
            nRooms: '',
            nBeds: '',
            radius: 20,
            services: [],
            center:null,
            myMap:null
            
        };
    },
    components: {
        AppHeader,
        AppMain,
        AppFooter
    },  
    methods: {
        callTheServices(){
            axios
            .get('http://localhost:8000/api/services',{
                params:{
                   
                }
            })
            .then(response=>{
                this.store.services = response.data.result;
                
               let map = this.myMap
                let markerElement = null
                for (let i = 0; i < this.store.FilteredApartments.length; i++) {
                      var  marker = new tt.Marker().setLngLat({lng:this.store.FilteredApartments[i].longitude,lat:this.store.FilteredApartments[i].latitude}).addTo(map)
                       
                    markerElement = marker.getPopup();
                    markerElement.className = 'apartment-marker';
                    markerElement.innerHTML = `
                    <img style="width: 50px" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
                    <div class="marker-content">
                        <h3>${this.store.FilteredApartments[i].name}</h3>
                        <p>${this.store.FilteredApartments[i].free_form_address}</p>
                    </div>
                    `;
                    this.map.on('load',() => {
                        marker
                        })
                }
            });
        },
        initializeMap(){
             this.center = [this.store.firstApi.lon,this.store.firstApi.lat]
                this.myMap = tt.map({
                    key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
                    container:"ma",
                    center:this.center,
                    zoom:10
                })
        },
                      
                            
                    
                    
                     
                     
                    
        advancedResearch(){
            axios
        // Faccio la prima chiamata API a tomtom e faccio trasformare l'input dell'utente in latitudine e longitudine
        .get(
          "http://localhost:8000/api/advancedResearch",
          {
            params: {
              lat: this.store.firstApi.lat,
              lon: this.store.firstApi.lon,
              nRooms: this.nRooms,
              nBeds: this.nBeds,
              distance: this.radius,
              services:this.services
            }
          }
        ).then((response) => {
            this.store.FilteredApartments = response.data.result;
                let map = this.myMap
                let markerElement = null
                for (let i = 0; i < this.store.FilteredApartments.length; i++) {
                      var  marker = new tt.Marker().setLngLat({lng:this.store.FilteredApartments[i].longitude,lat:this.store.FilteredApartments[i].latitude}).addTo(map)
                       
                    markerElement = marker.getElement();
                    markerElement.className = 'apartment-marker';
                    markerElement.innerHTML = `
                    <img style="width: 50px" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
                    <div class="marker-content">
                        <h3>${this.store.FilteredApartments[i].name}</h3>
                        <p>${this.store.FilteredApartments[i].free_form_address}</p>
                    </div>
                    `;
                    this.map.on('load',() => {
                        marker
                        })
                }
            console.log(response);
        })
        },
        
    },
    updated(){
        this.initializeMap();
    },
    mounted(){
            this.callTheServices();
           
           
        },
      
    
   
    components:{
        FilteredApartmentComponent
    },
}
</script>

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <div class="mt-3 mb-3 d-flex justify-content-center">
                <input v-model="nRooms" class="form-control w-50" placeholder="Minimum number of rooms">
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <input v-model="nBeds" class="form-control w-50" placeholder="Minimum number of beds">
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <input v-model="radius" type="range" class="form-range w-50" id="customRange1" min="1" max="50" step="1" >
                <div>{{ radius }} km</div>
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <div v-for="(elem, i) in store.services"  class="form-check me-3" :key="i">
                    <input v-model="services" class="form-check-input" type="checkbox" :value="elem.type_of_service" :id="elem.id">
                    <label class="form-check-label" :for="elem.id">
                        {{ elem.type_of_service }}
                    </label>
                </div> 
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <button @click="advancedResearch()" type="submit" class="btn btn-outline-dark m-2">
                    SEARCH
                </button>
            </div>
        </div>
        <div  v-if="store.FilteredApartments && store.FilteredApartments.length > 0" class="col-6 d-flex flex-wrap">
           
                <FilteredApartmentComponent v-for="(elem,j) in store.FilteredApartments" :apartment="elem" :key="j"/>
            
            </div>
            <div v-else>
                non ci sono appartamenti in questa posizione
            </div>
            <div id="ma" class="col-6">
      
            </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
#ma{
   margin-top: 70px;
    height: 800px;
    border-radius: 20px;
    .marker-content{
        width: 50px;
        border-radius: 10px;
        background-color: white!important;
        img{
            width: 100%;
        }
    }
}
</style>