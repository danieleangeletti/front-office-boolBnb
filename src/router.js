import { createRouter, createWebHistory } from "vue-router";
import HomePage from './App.vue';
import AdvancedSearch from './pages/AdvancedSearch.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home-page",
      component: HomePage,
    },
    {
      path: "/pages/AdvancedSearch",
      name: "advanced-search",
      component: AdvancedSearch,
    },

  ],
});

export { router };