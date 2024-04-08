<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import FilteredApartmentComponent from "../components/FilteredApartmentComponent.vue";
import axios from "axios";
import { store } from "../../store.js";
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
          console.log(response)
          //Inserisco la risposta in una variabile nello store
            this.store.apartments = response.data.result;
          
          for(let i = 0; i < this.store.apartments.length; i ++){
            if(response.data.result[i].sponsorships.length > 0){

              this.store.sponsoredApartments.push(response.data.result[i]) 
            }
          }
           for(let i = 0; i < this.store.apartments.length; i ++){
            if(response.data.result[i].sponsorships.length == 0){

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
    this.callTheApartmentsNormal();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class=" d-flex flex-column align-items-center ">
           
          <div class="d-flex">
              <input
            @keyup="handleInputClick"
              class="form-control my-2 user-search"
              v-model="store.userSearch"
              type="text"
            />
            <router-link
              v-if="store.isChecked"
              :to="{ name: 'advanced-search' }"
              @click="searchApartment"
              class="btn btn-outline-dark m-2"
            >
              SEARCH
            </router-link>
            <button v-else class="btn btn-outline-dark m-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                SEARCH
            </button>
          </div>
          <div class="position-relative list-box">
            <ul id="suggestions">

            </ul>
          </div>
         

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Devi scegliere un indirizzo dalla lista dei suggerimenti
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- v-if="store.FilteredApartments.length === 0" -->
      <div class="col-12">
        <h1>Appartamenti in evidenza</h1>
          <div class="d-flex flex-wrap border-bottom ">
            <ApartmentComponent
              v-for="(elem, i) in store.sponsoredApartments"
              :apartment="elem"
              :key="i"
            />
        </div>

        <h1>Appartamenti poveri</h1>
        <div class=" d-flex flex-wrap">
          <ApartmentComponent
            v-for="(elem, i) in store.notSponsoredApartments"
            :apartment="elem"
            :key="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

        
        

<style lang="scss" scoped>
@use "../assets/scss/main" as *;
.user-search {
  width: 400px;
}

.list-box{
  width: 400px;
  #suggestions {
    background-color: white;
    border-radius: 10px;
    padding: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
    

