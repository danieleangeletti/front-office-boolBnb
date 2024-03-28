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
</template>
                


<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
.card{
    width: calc(100% / 6 );
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
