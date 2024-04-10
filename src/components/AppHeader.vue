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
            })
        },
  },
};
  
              
                
</script>

<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top sticky-top vh-10 z-2 position-absolute">
        <div class="container-fluid">
            <router-link class="navbar-brand router-link" :to="{ name: 'Home-page' }" @click="callTheApartments()">
                <img src="../../public/img/logos/boolbnb-rosa-trasparente-150px.PNG" class="logo" alt="logo BoolBnb" />
            </router-link>

            <!-- Toggle -->
            <button class="navbar-toggler shadow-none border-0" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar" 
            >
            <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Sidebar Header -->
            <div class="sidebar offcanvas offcanvas-end" 
                tabindex="-1" 
                id="offcanvasNavbar" 
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">                    
                    <img src="../../public/img/logos/boolbnb-rosa-trasparente-150px.PNG" alt="logo BoolBnb" />
                    <button 
                    type="button" 
                    class="btn-close shadow-none" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close"></button>
                </div>

                <!-- Sidebar Body -->
                <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                    <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                        <li class="nav-item mx-2">
                            <router-link class="nav-link active router-link" :to="{ name: 'Home-page' }" @click="callTheApartments()">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item mx-2">
                            <a href="http://localhost:8000/" class="text-black text-decoration-none">
                                Area Personale
                            </a>                            
                        </li>
                    </ul>

                    <!-- Login / Sign up -->
                    <div class="login-box d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
                        <a href="http://localhost:8000/login" class="login"> Login </a>
                        <a href="http://localhost:8000/register" class="register text-white text-decoration-none px-3 py-1 rounded-4" style="background-color: #EB5A63;"> Registrati </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  </header>

</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

    .navbar-brand, .register{
        margin: 0 20px;
        border-radius: 20px;
    }
    li{
        &:hover{
            color: #EB5A63;
            text-decoration: #EB5A63 underline;
        }
    }

    .login{
        color: #EB5A63;
        text-decoration: none;

        &:hover{
            text-decoration: underline;
        }
    }
    .register{
        &:hover{
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
        }
    }

@media (max-width:768px) {
    
    .sidebar{
        backdrop-filter: blur(10px);
    }
    .logo {
        content: url(../../public/img/logos/boolairbnb-favicon.PNG);
        height: 8vh;
    }
  
}
</style>
