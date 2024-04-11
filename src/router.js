import { createRouter, createWebHistory } from "vue-router";
import HomePage from './App.vue';
import AdvancedSearch from './pages/AdvancedSearch.vue';
import ApartmentShow from './pages/ApartmentShow.vue'
import ApartmentIndex from "./pages/ApartmentIndex.vue";
import NotFound from "./pages/NotFound.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home-page",
      component: ApartmentIndex,
    },
    {
      path: "/pages/AdvancedSearch",
      name: "advanced-search",
      component: AdvancedSearch,
    },
    {
      path: "/pages/ApartmentShow/:slug",
      name: "apartment-show",
      component: ApartmentShow,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };