<script>
import AppHeader from './components/AppHeader.vue';
import ApartmentComponent from './components/ApartmentComponent.vue';
import AppFooter from './components/AppFooter.vue';
import axios from 'axios';

export default {
    data() {
        return {
            allApartments:[]
        };
    },
    components: {
        AppHeader,
        ApartmentComponent,
        AppFooter
    },  
    methods: {
        callTheApartments(){
            axios
            .get('http://localhost:8000/api/apartments',{
                params:{
                    // page: this.currentPage + 1
                }
            })
            .then(response=>{
                this.allApartments = response.data.result;
                console.log(this.allApartments)
            })
        }
    },
    mounted(){
        this.callTheApartments();
    }
}
</script>
        

<template>

    <AppHeader />
    <div class="container-fluid">
        <div class="row">
            <div class="col d-flex flex-wrap">
                <ApartmentComponent  v-for="(elem,i) in allApartments" :apartment="elem" :key="i"/>
            </div>
        </div>
    </div>
    <AppFooter />
</template>

<style lang="scss">
    @use "assets/scss/main" as *;
    @import "assets/scss/partials/reset";
</style>
