import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "WelcomeApp",
      component: WelcomeApp,
    },
    {
      path: "/ShowProject/:slug",
      name: "show-project",
      component: ShowProject,
    },

    {
      path: "/Project/index",
      name: "project-index",
      component: ProjectIndex,
    },
  ],
});

export { router };