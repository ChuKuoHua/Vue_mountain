<template>
  <div class="top">
    <a href="#" @click.prevent="scrollTop">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
/* global $ */

export default {
  methods: {
    scrollTop() {
      $('html ,body').animate({
        scrollTop: 0,
      }, 1000);
    },
  },
};
</script>
