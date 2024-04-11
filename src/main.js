import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { gsap } from "gsap";
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
createApp(App).use(router).mount('#app')


    gsap.from(".gsap-logo", { x: 2000, duration: 0.5, ease: "power2" });
    gsap.from(".gsap-logo-2", {
      y: 1000,
      delay: 0.5,
      rotate: 360,
      ease: "power2",
    });
    gsap.fromTo(
      ".my-welcome",
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 1.5, delay: 2 }
    );
    
    