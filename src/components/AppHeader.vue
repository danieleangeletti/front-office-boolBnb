<script>
import axios from "axios";
import { store } from "../../store.js";
export default {
  data() {
    return {
      store,
    };
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
                this.store.FilteredApartments = []
                console.log('ciao')
            })
        },
  },
};
  
              
                
</script>

<template>
  <header class="container-fluid text-center">
    <div class="row justify-content-between align-items-center h-100">
      <div class="col">
        <div class="img-box">
          <img src="" alt="logo BoolBnb" />
        </div>
      </div>
      <div class="col">
        <router-link class="router-link"   :to="{ name: 'Home-page' }"
          >
          <span @click="callTheApartments()">Home
          </span>
          </router-link
        >
        <router-link class="router-link" :to="{ name: 'advanced-search' }"
          >Ricerca avanzata</router-link
        >
      </div>
      <div class="col">login Placeholder</div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

header {
  height: 10vh;
  border-bottom: 1px solid lightgrey;
  .router-link {
    padding: 1rem 2rem;
    color: #717171;
    text-decoration: none;
    border-radius: 30px;
  }
}
</style>
