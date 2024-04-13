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
            <span v-if="apartment.sponsorships.length > 0" class="badge rounded-pill text-bg-light">In evidenza</span>
            <div class="img-box">
                <div class="img-wrapper">
                    <img v-if="apartment.img_cover_path" :src="'http://127.0.0.1:8000/storage/'+apartment.img_cover_path" alt="Cover Image">
                    <img v-else class="alt-img" src="../../img/logos/boolairbnb-favicon.PNG" alt="">
                </div>
            </div>
            <ul class="p-0 d-block">
                <li class="title">
                    {{ apartment.name }}
                </li>
                <li>
                    {{apartment.price }}€ per notte.
                </li>
                <li>
                    <!-- BADGE PER SPONSORSHIP -->
                </li>
            </ul>
        </router-link>
    </div> 

</template>

<style lang="scss" scoped>
.my-card {
    //width: calc(100% / 4);
    margin-top: 50px;
    padding: 20px;
    border: none!important;
    position: relative;
    .badge{
        position: absolute;
        z-index: 1;
        top: 7%;
        left: 10%;
        display: inline-block;
        height: 30px;
        line-height: 18px;
        vertical-align: middle;
        width: 100px;
        font-size: 0.8rem;
        font-weight:500;
        border: 1px solid lightgray;

    }
    .title{
        font-weight: 600;
    }
    .link {
        color: black;
        text-decoration: none;
    }

    .night {
        font-size: 0.9rem;
        color: gray;
        text-decoration: underline;
    }

    .img-box {
        position: relative;
        width: 100%;
        padding-top: 100%; 
        overflow: hidden;
        border-radius: 20px;

        .img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .alt-img{
                object-fit: contain;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    ul {
        li {
            list-style: none;
        }
    }
}

@media (max-width: 576px) {
    .my-card {
        width: calc(100% / 1);
    }
}
@media (min-width: 576px) {
    .my-card {
        width: calc(100% / 2);
    }
}
@media (min-width: 992px) {
    .my-card {
        width: calc(100% / 3);
    }
}

@media (min-width: 1200px) {
    .my-card {
        width: calc(100% / 4);
    }
}
@media (min-width: 1400px) {
    .my-card {
        width: calc(100% / 5);
    }
}
</style>