<script>
import axios from "axios";
export default {
  data() {
    return {
      apartment: null,
      flag:false,
      backendMessage: null,
      message: {
        name: null,
        last_name: null,
        text: null,
        email: null,
        term: null
      },
      showModal: false,
  };
},

methods: {
    sendMessageAndOpenModal() {
        this.sendMessage();
        this.openModal();
    },
    openModal() {
        
    },
    sendMessage() {
      // Esegui la chiamata API POST
      axios
        .post(
          `http://127.0.0.1:8000/api/store/${this.$route.params.slug}`,
          {
            text: this.message.text,
            name: this.message.name,
            last_name: this.message.last_name,
            email: this.message.email,
          },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // Gestisci la risposta dal backend
          console.log("Risposta dal backend:", response.data);
            if(response.data.success == true){
              this.message.name = null,
              this.message.last_name = null,
              this.message.text= null,
              this.message.email= null
              this.flag = true
              this.backendMessage = response.data.result
          }
          
        })
        .catch((error) => {
          // Gestisci gli errori
          console.error("Errore nella chiamata API:", error);
        });
    },
},
    created() {
        axios
            .get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
            .then((response) => {
                this.apartment = response.data.result;
                console.log("risposta api", response);        
            })
            
            .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        });
    },
    mounted(){
        let center = [this.apartment.longitude,this.apartment.latitude]
        const map = tt.map({
            key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
            container:"ma",
            center:center,
            zoom:13
        })
        map.on('load',() => {
            new tt.Marker().setLngLat(center).addTo(map)
        })
        fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({ ip }) => {
            this.term = ip;
           
            axios.post(`http://localhost:8000/api/view/${this.$route.params.slug}`,
            {
                ipAddress: this.term
            }
            ).then((response)=>{
                console.log('risposta view',response)
                
            })
            });
  }
            
};
</script>
    

<template>
    <div class="container-fluid mb-5">
        <div class="my-container">
            <div class="row">
                <div class="text-center mb-4">
                        <h1>
                            {{ apartment.name }}
                        </h1>
                    </div>
                <div class="col-12 col-sm-6 px-5"> <!-- Modifica qui -->
                    <div class="img-box">
                        <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_cover_path" alt="Cover Image"/>
                    </div>
                </div>
                <div class="col-12 col-sm-6 px-5"> <!-- Modifica qui -->
                    
                    <ul class="p-0">
                        <li>
                            <h5>{{ apartment.type_of_accomodation }}</h5>
                        </li>
                        <li>
                            L'alloggio si trova in {{ apartment.address }}
                        </li>
                        <li>
                            Il costo é di <span>{{ apartment.price }} € per notte. </span>
                        </li>
                        <li class="mt-4"> <!-- Rimuovi la classe d-flex -->
                            <div>
                                Caratteristiche dell'alloggio:
                                <ul class="p-0">
                                    <li>
                                        Numero di ospiti: {{ apartment.n_guests }}
                                    </li>
                                    <li>
                                        Numero di stanze: {{ apartment.n_rooms }}
                                    </li>
                                    <li>
                                        Numero di letti: {{ apartment.n_beds }}
                                    </li>
                                    <li>
                                        Numero di bagni: {{ apartment.n_baths }}
                                    </li>
                                    <li>
                                        Metratura {{ apartment.mq }} m²
                                    </li>
                                </ul>
                            </div>
                            <div class="my-4">
                                Servizi dell'appartamento:
                                <ul class="p-0">
                                    <li v-for="service in apartment.services" :key="service.id">
                                        <i :class="'fa-solid'  + ' '  + service.icon"></i><span>&nbsp&nbsp{{ service.type_of_service }}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div class="">
                        <a href="#my-contact-form" class="btn btn-outline-dark">
                            Vai al Form di Contatto
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    <div id="ma">
        <!-- MAPPA TOM TOM PER LOCATION APPARTAMENTO -->
    </div>

    <!-- INIZIO FORM -->
<div class="container-fluid my-5">
    <div class="my-container">
        <div class="col-12">
            <!-- messaggio dal backend per invio corretto del messaggio -->
            <h5 class="text-center mt-2" v-if="flag">{{ backendMessage }}</h5>

            <!-- se il messaggio é stato inviato si applica la classe green form -->
            <form class="p-3 " id="my-contact-form" :class="flag ? 'green-form':''" @submit.prevent method="post">
                <div class="row">
                    <div class="col-12 col-sm-6 mb-3">
                        <label for="name">Il tuo nome</label>
                        <input class="form-control" type="text" v-model="message.name" name="name" id="name"  maxlength="100">
                    </div>

                    <div class="col-12 col-sm-6 mb-3">
                        <label for="last_name">Il tuo cognome</label>
                        <input class="form-control" type="text" v-model="message.last_name"  name="last_name" id="last_name" maxlength="100">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">la tua mail<span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="message.email" name="email" id="email" required maxlength="100">
                </div>

                <div class="mb-3">
                    <label for="text">Il tuo messaggio<span class="text-danger">*</span></label>
                    <textarea  required id="message" v-model="message.text" class="form-control" rows="10" placeholder="Scrivi qui il tuo messaggio" ></textarea>
                </div>    

                <button @click="sendMessageAndOpenModal" class="btn btn-outline-dark centered">
                    Invia il messaggio
                </button>
            </form>
        </div>
    </div>
</div>
    
    <!-- FINE FORM -->
</template>


<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

.container-fluid {
    padding-left: 0;
    padding-right: 0;
    padding-top: 50px;
}


@media (max-width: 575px) {
    .my-container {
        width: 100%; 
        margin: 0;
    }
}

@media (min-width: 576px) {
    .my-container {
        width: 1400px;
        margin: 0 auto;
    }
}

.centered {
    display: block;
    margin: auto;
}

ul {
    li {
        list-style: none;
    }
}

.img-box {
    img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
    }
}

.green-form{
    border: 3px solid green;
    border-radius: 10px;
}

#ma{
    width: 100%;
    height: 500px;
}


</style>
