<template>
  <div class="navbar navbar-fixed-top fixed-top d-flex justify-content-between">
    <div class="back-logo">
      <router-link to="/">MOUNTAIN</router-link>
    </div>
    <div class="back-menu">
      <a class="ml-3 sign-box" href="#" @click.prevent="signout">
        <span class="sign-span">登出</span>
        <i class="fas fa-sign-out-alt"></i>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      document.cookie = 'hexToken=; expires=; path=/';
      this.$router.push('/login');
    },
  },
};
</script>
