<script>
import ApartmentComponent from '../components/ApartmentComponent.vue';
import FilteredApartmentComponent from '../components/FilteredApartmentComponent.vue';
import axios from 'axios';
import { store } from "../../store.js";
export default {
    data(){
        return{
            store
        }
    },  
    methods: {
        callTheApartments(){
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
    },
    components:{
        ApartmentComponent,
        FilteredApartmentComponent
    },
    mounted(){
        this.callTheApartments();
    }
}
</script>

<template>
    <div class="container-fluid">
            <div class="row">
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
           