<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    props:{
        apartment:Object
    } 
}
</script>

<template>
    
    <div class="my-card">
        <router-link class="link" :to="{name:'apartment-show', params: { slug: apartment.slug }}">
            <div class="img-box">
                <img :src="'http://127.0.0.1:8000/storage/'+apartment.img_cover_path" alt="Cover Image">
            </div>
            <ul class="p-0 d-block">
                <li>
                    {{ apartment.name }}
                </li>
                <li>
                    <span>${{ Math.floor(apartment.price) }} </span><span >notte .</span><span class="night ms-1">${{ Math.floor(apartment.price * apartment.n_guests) }} in totale</span>
                </li>
            </ul>
        </router-link>
    </div>
</template>
                
            


<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
.my-card{
    width: calc(100% / 6 );
    margin-top: 50px;
    padding: 20px;
    border:none!important;
    .link{
        color: black;
        text-decoration: none;
    }
    .night{
        font-size: 0.9rem;
        color: gray;
        text-decoration: underline;
    }
    .img-box{
        height: 300px;
        img{
            border-radius:20px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    ul{
        li{
            list-style: none;
        }
    }
}
</style>
