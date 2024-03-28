<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {

    }
}
</script>


<template>

    <header class="container-fluid text-center">

        <div class="row justify-content-between align-items-center h-100">
            <div class="col">
                <div class="img-box">
                    <img src="" alt="logo BoolBnb">
                </div>
            </div>
            <div class="col">
                <a class="router-link mx-3" href="../App.vue"> Home </a>
                <a class="router-link mx-3" href="../pages/AdvancedSearch.vue"> Ricerca avanzata</a>
            </div>
            <div class="col">
                login Placeholder
            </div>
        </div>

    </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;

header{
    height: 10vh;
    border-bottom: 1px solid lightgrey;
    .router-link{
        padding: 1rem 2rem;
        color: #717171;
        text-decoration: none;
        border-radius: 30px;
    }
    
}

</style>
       
