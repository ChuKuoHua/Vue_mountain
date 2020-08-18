<template>
  <div id="home">
    <div class="home-banner position-relative">
      <div class="banner-tit text-center">
        <h1 class="mb-3">MOUNTAIN</h1>
        <p>人生的風景 最美麗的驚嘆</p>
        <router-link
          to="/products"
          class="text-dark float-right go-btn mt-3">
          前往購物
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
      <div class="down-box">
        <a class="text-dark down-btn" href="#news" @click.prevent="scrollNews">
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>
    <div class="container d-flex
      justify-content-center align-items-center">
      <div class="col-md-6 news-box" id="news">
        <h3 class="font-weight-bolder text-center mb-3">最新消息</h3>
        <ul>
          <li>
            <p class="date-new">2020 / 07 / 19</p>
            <p>店長順利歸來，每人享有 7 折優惠：C7LI9M20BER</p>
          </li>
          <li>
            <p class="date-new">2020 / 07 / 05</p>
            <p>店長成功登上世界最高峰，商品全面 85 折</p>
          </li>
          <li>
            <p class="date-new">2020 / 06 / 25</p>
            <p>只要金額滿 1299 元，享有免運優惠</p>
          </li>
          <li>
            <p class="date-new">2020 / 06 / 19</p>
            <p>MOUNTAIN 店商即將上市</p>
          </li>
          <li>
            <p class="date-new">2020 / 05 / 19</p>
            <p>祝各位都能順利完成最終作業~</p>
          </li>
        </ul>
      </div>
      <div class="col-md-6 left-new-bg mx-3">
      </div>
    </div>
    <div class="home-footer">
      <HomeProducts />
    </div>
  </div>
</template>

<script>
/* global $ */
import HomeProducts from '@/components/HomeProducts.vue';

export default {
  name: 'home',
  components: {
    HomeProducts,
  },
  methods: {
    scrollNews() {
      const target = $('.down-btn').attr('href');
      const targetPos = $(target).offset().top;
      $('html,body').animate({
        scrollTop: targetPos - 70,
      }, 1000);
    },
  },
};
</script>
