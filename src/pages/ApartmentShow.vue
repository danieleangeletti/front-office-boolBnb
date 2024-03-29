<script>
import axios from 'axios';
export default {
    data() {
        return {
            apartment:null,

            message:''
        };
    },
        methods: {
        sendMessage() {
            // Esegui la chiamata API POST
            axios.post('http://localhost:5174/',
            {
             message: this.message,
            },
            {
            headers: {
                "content-type": "multipart/form-data",
            },
            }
            
             )
                .then(response => {
                    // Gestisci la risposta dal backend
                    console.log('Risposta dal backend:', response.data);
                })
                .catch(error => {
                    // Gestisci gli errori
                    console.error('Errore nella chiamata API:', error);
                });
        }},
  created() {
    axios
      .get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
      .then((response) => {
        this.apartment = response.data.result;
        console.log('risposta api',response )
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
      });
    } 
}
</script>
        

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="img-box">
                        <img :src="apartment.img_cover_path" alt="Cover Image">
                    </div>
                    <ul class="p-0">
                        <li>
                            {{ apartment.name }}
                        </li>
                        <li>
                            <span>${{ Math.floor(apartment.price) }} </span><span >notte .</span><span class="night ms-1">${{ Math.floor(apartment.price * apartment.n_guests) }} in totale</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <form @submit.prevent action="">
                    <label for="message">
                        Scrivi un messaggio all'host
                    </label>
                    <textarea v-model="message" name="" id="message" cols="30" rows="10"></textarea>
                    <button @click="sendMessage" class="btn btn-outline-dark">Invia il messaggio</button>
                </form>
            </div>
        </div>
    </div>
    
</template>
                
            


<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
.card{
  
    margin-top: 50px;
    padding: 20px;
    border:none!important;
    .night{
        font-size: 0.9rem;
        color: gray;
        text-decoration: underline;
    }
    .img-box{
        img{
            border-radius:20px;
            width: 100%;
            height: 100%;
        }
    }
    ul{
        li{
            list-style: none;
        }
    }
}
</style>
