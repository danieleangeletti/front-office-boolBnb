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

          //Preparo una lista di appartamenti (in questo caso 25 perchè tomtom non vuole strighe troppo lunghe)
          //nel formato specificato nella documentazione di tomtom
          
          for (let i = 0; i < 20; i++) {
            if (
              this.store.apartments[i].latitude &&
              this.store.apartments[i].longitude != null
            ) {
              this.store.poilist.push({
                poi: {
                  name: this.store.apartments[i].name,
                },
                address: {
                  " freeformAddress": this.store.apartments[i].address,
                },
                position: {
                  lat: parseFloat(this.store.apartments[i].latitude),
                  lon: parseFloat(this.store.apartments[i].longitude),
                },
              });
            }
          }
          //trasformo la lista di POI creata in precedenza in una stringa JSON
          this.store.jsonPoilist = JSON.stringify(this.store.poilist);
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

          //Faccio la seconda chiamata a tomtom dove specifico: 1-tipo di figura geometrica da usare come forma per il filtraggio
          //                                            2-chiave API personale presa dal sito di tomtom
          //                                            3-La lista di Appartamenti da filtrare in formato JSON
          axios
            .get(
              'https://api.tomtom.com/search/2/geometryFilter.json?geometryList=[{"type":"CIRCLE", "position":"' +
                this.store.firstApi.lat +
                ", " +
                this.store.firstApi.lon +
                '", "radius":20000}]',
              {
                params: {
                  key: "uQKNMTMSFoV1bSWi015M9fIPIvXFMwfK",

                  poiList: this.store.jsonPoilist,
                },
              }
            )
            .then((responseThree) => {
              let myData = responseThree.data.results;
              
              //  Dichiaro e uso una variabile dove pusho tutti i nomi presi dalla risposta alla precedente chiamata api di tomtom
              for (let i = 0; i < myData.length; i++) {
                this.store.apartmentName.push(myData[i]["poi"].name);
              }
              axios
                // Faccio una terza chiamata, questa volta al mio backend, che mi cerchera nel database gli appartamenti che corrispondono a quei nomi
                .get("http://localhost:8000/api/getApartments", {
                  params: {
                    allName: this.store.apartmentName,
                  },
                })
                .then((response) => {
                  // Inserisco
                  this.store.FilteredApartments = response.data.result;
                });
            });
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
                        suggestion.textContent = result.address.freeformAddress;
                        suggestion.addEventListener("click", function() {
                          store.userSearch = result.address.freeformAddress;
                          suggestionsContainer.innerHTML = "";
                          store.isChecked = true
                        });
                        suggestionsContainer.appendChild(suggestion);
                    });
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
        <div class="d-flex justify-content-center position-relative ">
          <input
           @keyup="handleInputClick"
            class="form-control my-2 user-search"
            v-model="store.userSearch"
            type="text"
          />
          <ul id="suggestions">

          </ul>
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

        
        

<style lang="scss" >
@use "../assets/scss/main" as *;
.user-search {
  width: 400px;
}

#suggestion {
    background-color: white;
    border-radius: 10px;
    padding: 0;
    position: absolute;
    bottom: 50;
    left: 50;

    li {
        margin: 4px;
        padding: 4px;
        border-radius: 10px;
        list-style: none;
        width: 200px;

        &:hover {
            background-color: rgb(0, 0, 0, 0.2);
        }
    }
}
</style>

