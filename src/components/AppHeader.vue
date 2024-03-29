<script>
import axios from 'axios';
export default {
    data() {
        return {
            userSearch:''
        };
    },
    methods: {
        searchApartment(){
            axios.get('http://localhost:8000/api/apartments',{
                params:{
                   
                }
            })
            .then(response=>{
                console.log(response)
            });
        }
    }
}
</script>
            


<template>

    <header class="container-fluid text-center">

        <div class="row justify-content-between align-items-center h-100">
            <div class="col">
                <div class="img-box">
                    <img src="" alt="logo BoolBnb">
                </div>
            </div>
            <div class="col">
                <router-link class="router-link" :to="{name: 'Home-page'}">Home</router-link>
                <router-link class="router-link" :to="{name: 'advanced-search'}">Ricerca avanzata</router-link>
            </div>
            <div class="col">
                login Placeholder
            </div>
            <div class="col-12">
                <form  @subtmit.prevent action="">
                    <input v-model="userSearch" type="text">
                    <button @click="searchApartment" class="btn btn-outline-dark m-2 "> cerca</button>
                </form>
            </div>
        </div>

    </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

header{
    height: 10vh;
    border-bottom: 1px solid lightgrey;
    .router-link{
        padding: 1rem 2rem;
        color: #717171;
        text-decoration: none;
        border-radius: 30px;
    }
    
}

</style>
       
