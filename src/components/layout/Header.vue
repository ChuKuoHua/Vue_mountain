<template>
  <header class="header-navbar">
    <nav class="container d-flex justify-content-between">
      <div class="logo">
        <router-link to="/">MOUNTAIN</router-link>
      </div>
      <div class="front-menu">
        <ul class="navbar-nav flex-row">
          <li>
            <router-link
              to="/"
            >首頁</router-link>
          </li>
          <li>
            <router-link
              to="/products"
            >商品列表</router-link>
          </li>
          <li>
            <router-link
              to="/about"
            >關於我們</router-link>
          </li>
        </ul>
      </div>
      <div class="front-login position-relative">
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge badge-danger">
            {{ cart }}
          </span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      cart: 0,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  created() {
    this.getCart();
    this.$bus.$on('update-total', () => {
      this.getCart();
    });
  },
  beforeDestroy() {
    this.$bus.$off('update-total', () => {
      this.getCart();
    });
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping`;
      this.$http
        .get(url)
        .then((res) => {
          this.cart = res.data.data.length;
        });
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 0) {
        $('.header-navbar').addClass('active');
      } else {
        $('.header-navbar').removeClass('active');
      }
    });
  },
};
</script>
