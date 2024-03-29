<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppMain from './components/AppMain.vue';

export default {
    data() {
        return {
            
        };
    },
    components: {
        AppHeader,
        AppFooter,
        AppMain
    }
}
</script>
        

<template>

    <AppHeader />
       <AppMain />
    <AppFooter />
</template>
        

<style lang="scss">
    @use "assets/scss/main" as *;
    @import "assets/scss/partials/reset";
</style>

