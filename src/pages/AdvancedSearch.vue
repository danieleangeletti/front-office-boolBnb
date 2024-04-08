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
            radius: '',
            services: [],
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
            });
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
              distance: this.radius
            }
          }
        ).then((response) => {
            this.store.FilteredApartments = response.data.result;
        })
        }
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
                <input v-model="radius" type="range" class="form-range w-50" id="customRange1" min="1" max="300" step="1">
                <div>{{ radius }} km</div>
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <div v-for="(elem, i) in store.services"  class="form-check me-3" :key="i">
                    <input v-model="services" class="form-check-input" type="checkbox" :value="elem.type_of_service" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
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
        <div class="col-12">
            <div v-if="store.FilteredApartments && store.FilteredApartments.length > 0" class="col d-flex flex-wrap">
                <FilteredApartmentComponent v-for="(elem,j) in store.FilteredApartments" :apartment="elem" :key="j"/>
            </div>
            <div v-else>
                non ci sono appartamenti in questa posizione
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>