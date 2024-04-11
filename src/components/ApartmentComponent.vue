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
                <div class="img-wrapper">
                    <img :src="'http://127.0.0.1:8000/storage/'+apartment.img_cover_path" alt="Cover Image">
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