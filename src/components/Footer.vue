<template>
  <div class="position-relative footer-navbar">
    <div class="container d-flex justify-content-between">
      <div class="conn d-flex justify-content-between flex-column">
        <ul class="navbar-nav flex-row  justify-content-around py-2">
          <li>
            <router-link to="/">
              <span class="sideline">首頁</span>
            </router-link>
          </li>
          <li>
            <router-link to="/products">
              <span class="sideline">商品列表</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span class="sideline">關於我們</span>
            </router-link>
          </li>
        </ul>
        <p class="mt-3">Copyright © 2020 Chu kuohua</p>
      </div>
      <div class="footer-logo d-flex align-items-center">
        <router-link to="/">MOUNTAIN</router-link>
      </div>
      <div class="icon-box text-right">
        <ul class="py-2 d-flex justify-content-around">
          <li>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
        </ul>
        <p class="mt-3">僅做為個人學習使用，非商業用途</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
