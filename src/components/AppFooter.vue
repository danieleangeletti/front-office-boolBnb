<script>
export default {
  data() {
    return {
      destinations: [
        "Popolari",
        "Sul litorale",
        "Destinazioni storiche",
        "Isole",
        "Montagne",
        "Categorie",
        "Attività",
      ],
    };
  },
  methods: {},
};
</script>

<template>
  <footer class="footer-bg">
    <div class="container">
      <h4>Ispirazione per viaggi futuri</h4>
      <ul class="list-unstyled">
        <li v-for="(elem, i) in destinations" class="d-inline-block">
          <span v-if="i == 0" class="ps-0 pe-3">{{ elem }}</span>
          <span v-if="i > 0 && i < destinations.length - 1" class="ps-3 pe-3">{{
            elem
          }}</span>
          <span v-if="i == destinations.length - 1" class="ps-3 pe-0">{{
            elem
          }}</span>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main.scss" as *;
.footer-bg {
  background-color: #f7f7f7;
}
</style>
