<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import FilteredApartmentComponent from "../components/FilteredApartmentComponent.vue";
import axios from "axios";
import { store } from "../../store.js";
import { gsap } from "gsap";
export default {
    data() {
        return {
            store,
            
            
        };
    },
  methods: {
    callTheApartmentsNormal() {
      axios
        //faccio la prima chiamata al mio backend per ricevere tutti gli appartamenti del database
        .get("http://localhost:8000/api/apartments", {
          params: {},
        })
        .then((response) => {
          //Inserisco la risposta in una variabile nello store
            this.store.apartments = response.data.result;
            this.store.notSponsoredApartments = []
            this.store.sponsoredApartments =  []
          for(let i = 0; i < this.store.apartments.length; i ++){
            if(response.data.result[i].sponsorships.length > 0 && response.data.result[i].availability == 1){
              this.store.sponsoredApartments.push(response.data.result[i]) 
            }
          }
           for(let i = 0; i < this.store.apartments.length; i ++ ){
            if(response.data.result[i].sponsorships.length == 0 && response.data.result[i].availability == 1){

              this.store.notSponsoredApartments.push(response.data.result[i]) 
            }
          }
        });
              

                
    },
    searchApartment() {
      axios
        // Faccio la prima chiamata API a tomtom e faccio trasformare l'input dell'utente in latitudine e longitudine
        .get(
          "https://api.tomtom.com/search/2/geocode/.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
          {
            params: {
              query: this.store.userSearch,
            },
          }
        )
        .then((responseOne) => {
          this.store.firstApi = responseOne.data.results[0].position;
          axios.get("http://localhost:8000/api/getApartments", {
            params: {
              lat: this.store.firstApi.lat,
              lon: this.store.firstApi.lon
            }
          })
          .then((response) => {
            this.store.FilteredApartments = response.data.result;
          })
        });
    },
    
    handleInputClick() {
      // Qui puoi inserire la logica da eseguire quando l'utente clicca sull'input
            let suggestionsContainer = document.getElementById("suggestions");
            let addressInput = this.store.userSearch;
            const input = addressInput.trim();
            store.isChecked = false
            if (input.length === 0) {
                suggestionsContainer.innerHTML = "";
                return;
            }

            fetch(
                    `https://api.tomtom.com/search/2/search/${input}.json?key=03zxGHB5yWE9tQEW9M7m9s46vREYKHct`
                )
                .then(response => response.json())
                .then(data => {
                    suggestionsContainer.innerHTML = ""; // Svuota i suggerimenti precedenti

                    data.results.forEach(result => {
                        const suggestion = document.createElement("li");
                        suggestion.classList.add('suggestion-list')
                        //  suggestion.style.backgroundColor = "white"; // Applica lo stile inline
                        //   suggestion.style.borderRadius = "10px";
                        //   suggestion.style.padding = "4px";
                        //   suggestion.style.listStyle = "none";
                        //   suggestion.style.width = "200px";
                        suggestion.textContent = result.address.freeformAddress;
                        suggestion.addEventListener("click", function() {
                        store.userSearch = result.address.freeformAddress;
                        suggestionsContainer.innerHTML = "";
                        store.isChecked = true
                        });
                        suggestionsContainer.appendChild(suggestion);
                    });
                    document.addEventListener("click", function() {
                        
                        suggestionsContainer.innerHTML = "";
                    })
                })
                .catch(error => console.error("Errore durante il recupero dei suggerimenti:", error));
        
    }

  },
  components: {
    ApartmentComponent,
    FilteredApartmentComponent,
  },
 mounted() {
    setTimeout(() => {
        this.callTheApartmentsNormal();
    }, 2200);
    gsap.from(".sponsorized", { x: -500, duration: 1, delay:3 ,ease:'power4'});

    window.addEventListener('scroll', function() {
        var scrollButton = document.querySelector('.scroll-to-top');
        if (window.scrollY > 100) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    document.querySelector('.scroll-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

};
</script>

<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="col-12">
         <div class=" d-flex flex-column align-items-center"> <!-- DA SISTEMARE CENTRATURA DELLA LABEL -->
          <div class="d-flex flex-column">
            <div class="px-2">
              <label for="first-search mt-2">Cerca Appartamenti entro 20km:</label>
            </div>
            <div class="d-flex">
              <input @keyup="handleInputClick" class="form-control my-2 user-search" v-model="store.userSearch" type="text" id="first-search" placeholder="Inserisci un indirizzo qui"/>
              <router-link v-if="store.isChecked" :to="{ name: 'advanced-search' }"  @click="searchApartment" class="my-primary-button m-2" id="search-button-after-check">
                SEARCH
              </router-link>
              <button v-else class="my-primary-button m-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                SEARCH
              </button>
            </div>
            
          </div>
          <div class="position-relative list-box">
            <ul id="suggestions">
              <!--SUGGERIMENTI INDIRIZZI GENERATI DA TOMTOM-->
            </ul>
          </div>
          <div class="scroll-to-top" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
          </div>
         

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Attenzione!</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Devi scegliere un indirizzo dalla lista dei suggerimenti
                </div>
                <div class="modal-footer">
                  <button type="button" class="my-primary-button" data-bs-dismiss="modal">CHIUDI</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- v-if="store.FilteredApartments.length === 0" -->
      <div class="col-12">
        <h1 class="sponsorized"></h1>
          <div class="d-flex flex-wrap border-bottom ">
            <ApartmentComponent
              v-for="(elem, i) in store.sponsoredApartments"
              :apartment="elem"
              :key="i"
              class="box"
            />
            <ApartmentComponent
            v-for="(x, j) in store.notSponsoredApartments"
            :apartment="x"
            :key="j"
            class="box"
          />
        </div>
       
      </div>
    </div>
  </div>
</template>

        
        

<style lang="scss" scoped>

@use '../assets/scss/partials/mixins.scss' as *;

@use "../assets/scss/main" as *;
.user-search {
  width: 400px;
  border-radius: 50px;
}

.my-primary-button {
  @include primary-button-styles;
}

.btn-close {
  color: #ec5a64;
}

#search-button-after-check {
  padding-top: 5px;
  padding-bottom: 5px;
}

.list-box{
  width: 500px;
  #suggestions {
    background-color: white;
    /* border: 1px solid #ec5a64; */
    border-radius: 5px;
    padding: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
  }
}

.scroll-to-top {
    display: none;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: rgba(235, 90, 99, 1);
    color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    z-index: 999;
    transition: transform 0.3s ease; /* Aggiungi transizione fluida per l'ingrandimento */

        &:hover {
            transform: scale(1.1); /* Inganna l'elemento del 10% durante l'hover */
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5); /* Aggiungi ombra */
        }
}

.scroll-to-top i {
    font-size: 20px;
}
</style>
    

