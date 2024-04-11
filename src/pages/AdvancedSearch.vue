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
            // center:null,
            // myMap:null
            
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
                
            //    let map = this.myMap
            //     let markerElement = null
            //     for (let i = 0; i < this.store.FilteredApartments.length; i++) {
            //           var  marker = new tt.Marker().setLngLat({lng:this.store.FilteredApartments[i].longitude,lat:this.store.FilteredApartments[i].latitude}).addTo(map)
                       
            //         markerElement = marker.getPopup();
            //         markerElement.className = 'apartment-marker';
            //         markerElement.innerHTML = `
            //         <img style="width: 50px" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
            //         <div class="marker-content">
            //             <h3>${this.store.FilteredApartments[i].name}</h3>
            //             <p>${this.store.FilteredApartments[i].free_form_address}</p>
            //         </div>
            //         `;
            //         this.map.on('load',() => {
            //             marker
            //             })
            //     }
            });
        },
        // initializeMap(){
        //      this.center = [this.store.firstApi.lon,this.store.firstApi.lat]
        //         this.myMap = tt.map({
        //             key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
        //             container:"ma",
        //             center:this.center,
        //             zoom:10
        //         })
        // },
                      
                            
                    
                    
                     
                     
                    
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
                // let map = this.myMap
                // let markerElement = null
                // for (let i = 0; i < this.store.FilteredApartments.length; i++) {
                //       var  marker = new tt.Marker().setLngLat({lng:this.store.FilteredApartments[i].longitude,lat:this.store.FilteredApartments[i].latitude}).addTo(map)
                       
                //     markerElement = marker.getElement();
                //     markerElement.className = 'apartment-marker';
                //     markerElement.innerHTML = `
                //     <img style="width: 50px" src="http://127.0.0.1:8000/storage/${this.store.FilteredApartments[i].img_cover_path}" alt="Apartment Image">
                //     <div class="marker-content">
                //         <h3>${this.store.FilteredApartments[i].name}</h3>
                //         <p>${this.store.FilteredApartments[i].free_form_address}</p>
                //     </div>
                //     `;
                //     this.map.on('load',() => {
                //         marker
                //         })
                // }
            console.log(response);
        })
        },
        
    },
    // updated(){
    //     this.initializeMap();
    // },
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
            <div class="mb-3 d-flex flex-wrap justify-content-center">
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
        <div  v-if="store.FilteredApartments && store.FilteredApartments.length > 0" class="col d-flex flex-wrap my-card">
           
                <FilteredApartmentComponent v-for="(elem,j) in store.FilteredApartments" :apartment="elem" :key="j"/>
            
            </div>
            <div v-else>
                non ci sono appartamenti in questa posizione
            </div>
            <!-- <div id="ma" class="col-6">
      
            </div> -->
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

.my-card {
    //width: calc(100% / 4);
    margin-top: 50px;
    padding: 20px;
    border: none!important;
    position: relative;
    .badge{
        position: absolute;
        z-index: 1;
        top: 7%;
        left: 10%;
        display: inline-block;
        height: 30px;
        line-height: 18px;
        vertical-align: middle;
        width: 100px;
        font-size: 0.8rem;
        font-weight:500;
        border: 1px solid lightgray;

    }
    .title{
        font-weight: 600;
    }
    .link {
        color: black;
        text-decoration: none;
    }

    .night {
        font-size: 0.9rem;
        color: gray;
        text-decoration: underline;
    }

    .img-box {
        position: relative;
        width: 100%;
        padding-top: 100%; 
        overflow: hidden;
        border-radius: 20px;

        .img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    ul {
        li {
            list-style: none;
        }
    }
}

@media (max-width: 576px) {
    .my-card {
        width: calc(100% / 1);
    }
}
@media (min-width: 576px) {
    .my-card {
        width: calc(100% / 2);
    }
}
@media (min-width: 992px) {
    .my-card {
        width: calc(100% / 3);
    }
}

@media (min-width: 1200px) {
    .my-card {
        width: calc(100% / 4);
    }
}
@media (min-width: 1400px) {
    .my-card {
    width: calc(100% / 5);
    }
}
</style>