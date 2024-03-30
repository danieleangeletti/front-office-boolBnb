# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).



   axios.get(`https://api.tomtom.com/search/2/geometryFilter.json/${this.jsonPoilist}.json`,{
                 params:{
                    key:"03zxGHB5yWE9tQEW9M7m9s46vREYKHct",
                    geometryList:{
                         "type": "CIRCLE",
                         "position": `${this.firstApi.lat} , ${this.firstApi.lon}`,
                         "radius": 20000
                    }
                    
                     
                     
                    }
                        