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
        searchApartmentAdvanced() {

            this.store.FilteredApartments = []
            let UserRadiusInMeters = this.radius * 1000
            
            axios
            .get('https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"'+ this.store.firstApi.lat +', '+ this.store.firstApi.lon+ '", "radius":'+UserRadiusInMeters+'}]', {
                params: {
                key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",

                poiList: this.store.jsonPoilist
                },
            })
            .then((TomTomresponse) => {
                this.store.apartmentName = []
                console.log('risposta api tomtom',TomTomresponse)
                let myData = TomTomresponse.data.results;
                console.log('my data',myData)
                for(let i = 0; i < myData.length ; i ++){
                this.store.apartmentName.push(myData[i]['poi'].name) 
                }
                    axios
                    .get('http://localhost:8000/api/advancedResearch',{
                        params:{
                            allName : this.store.apartmentName,
                            nRooms: this.nRooms,
                            nBeds: this.nBeds
                        }
                    })
                    .then(response=>{
                        this.store.FilteredApartments = response.data.result;
                        console.log(this.store.FilteredApartments)
                    })
            });
        },
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
                    <input class="form-check-input" type="checkbox" :value="elem.type_of_service" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ elem.type_of_service }}
                    </label>
                </div> 
            </div>
            <div class="mb-3 d-flex justify-content-center">
                <button @click="searchApartmentAdvanced" type="submit" class="btn btn-outline-dark m-2">
                    SEARCH
                </button>
            </div>
        </div>
        <div class="col-12">
            
            <div v-if="store.FilteredApartments.length != 0" class="col d-flex flex-wrap">
                <FilteredApartmentComponent v-for="(elem,j) in store.FilteredApartments" :apartment="elem" :key="j"/>
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>