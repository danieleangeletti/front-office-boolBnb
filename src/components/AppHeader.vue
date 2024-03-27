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
    <header>
       <router-link :to="{name: 'Home-page'}"> Home </router-link>
       <router-link :to="{name: 'advanced-search'}"> Ricerca avanzata</router-link>
    </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
</style>
