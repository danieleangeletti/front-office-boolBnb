<script>
import axios from 'axios';
import { store } from '../../store';
import AppHeader from '../components/AppHeader.vue';
import AppMain from '../components/AppMain.vue';
import AppFooter from '../components/AppFooter.vue';
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
                console.log(this.store.services)
            });
        },
    },
    mounted(){
        this.callTheServices();
    }
}
</script>

<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <form>
                <div class="mt-3 mb-3 d-flex justify-content-center">
                    <input v-model="nRooms" class="form-control w-50" placeholder="Minimum number of rooms"></input>
                </div>
                <div class="mb-3 d-flex justify-content-center">
                    <input v-model="nBeds" class="form-control w-50" placeholder="Minimum number of beds"></input>
                </div>
                <div class="mb-3 d-flex justify-content-center">
                    <input v-model="radius" type="range" class="form-range w-50" id="customRange1" min="0" max="50" step="0.5">
                    <div>{{ radius }} km</div>
                </div>
                <div class="mb-3 d-flex justify-content-center">
                    <div v-for="(elem, i) in store.services"  class="form-check me-3">
                        <input class="form-check-input" type="checkbox" :value="elem.type_of_service" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            {{ elem.type_of_service }}
                        </label>
                    </div>
                </div>
                <div class="mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-outline-dark m-2">
                        SEARCH
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

</style>