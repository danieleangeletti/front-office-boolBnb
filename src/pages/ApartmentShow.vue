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
        
      },
  };
},

  methods: {
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
          console.log('flag',this.flag)
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
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="img-box">
            <img
              :src="'http://127.0.0.1:8000/storage/' + apartment.img_cover_path"
              alt="Cover Image"
            />
          </div>
          <ul class="p-0">
            <li>
              {{ apartment.name }}
            </li>
            <li>
              <span>${{ Math.floor(apartment.price) }} </span
              ><span>notte .</span
              ><span class="night ms-1"
                >${{ Math.floor(apartment.price * apartment.n_guests) }} in
                totale</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <h5 class="text-center mt-2" v-if="flag">{{ backendMessage }}</h5>
        <form class="p-3 " :class="flag ? 'green-form':''" @submit.prevent method="post">
          <div class="mb-3">
            <label for="text"> Scrivi un messaggio all'host </label>
            <input
              class="form-control"
              type="text"
              v-model="message.text"
              name="text"
              id="message"
              cols="30"
              rows="10"
              required
            />
          </div>

          <div class="mb-3">
            <label for="name"> Inserisci il tuo nome </label>
            <input
             class="form-control"
              type="text"
              v-model="message.name"
              name="name"
              id="name"
              cols="30"
              rows="10"
              required
            />
          </div>

          <div class="mb-3">
            <label for="last_name"> Inserisci il tuo cognome </label>
            <input
             class="form-control"
              type="text"
              v-model="message.last_name"
              name="last_name"
              id="last_name"
              cols="30"
              rows="10"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email"> Inserisci la tua mail </label>
            <input
             class="form-control"
              type="text"
              v-model="message.email"
              name="email"
              id="email"
              cols="30"
              rows="10"
              required
              
            />
          </div>
          <button @click="sendMessage" class="btn btn-outline-dark">
            Invia il messaggio
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
.card {
 
  padding: 16px;
  border: none !important;
  .night {
    font-size: 0.9rem;
    color: gray;
    text-decoration: underline;
  }
  .img-box {
    img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
    }
  }
  ul {
    li {
      list-style: none;
    }
  }
}
.green-form{
  border: 3px solid green;
  border-radius: 10px;
}
</style>
