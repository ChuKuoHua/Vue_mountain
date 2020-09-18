<template>
  <div id="home" class="home-bg">
    <Swiper ref="mySwiper" class="swiper-pb" :options="swiperOption">
      <swiper-slide class="home-banner"></swiper-slide>
      <swiper-slide class="home-banner-two"></swiper-slide>
      <div class="container banner-tit-box">
        <div
          class="banner-tit text-center"
        >
          <h1 class="mb-3">MOUNTAIN</h1>
          <p>人生的風景 最美麗的驚嘆</p>
          <router-link
            to="/products"
            class="text-dark float-right go-btn mt-3">
            前往購物
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>
      <div class="down-box">
        <a class="text-dark down-btn" href="#news" @click.prevent="scrollNews">
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
      <div class="swiper-pagination swiper-mt" slot="pagination"></div>
    </Swiper>
    <div class="container pb-2">
      <div class="row mx-0
        justify-content-center align-items-center"
      >
        <section
          class="col-lg-8 col-md-12 news-box"
          id="news"
        >
          <h3 class="font-weight-bolder text-center h4 mb-3">最新消息</h3>
          <ul class="news-group">
            <li data-aos="fade-left">
              <p>
                <span class="date-new mr-2">2020 / 07 / 19</span>
                店長順利歸來，每人享有 7 折優惠：C7LI9M20BER
              </p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="50">
              <p>
                <span class="date-new mr-2">2020 / 07 / 05</span>
                店長成功登上世界最高峰，商品全面 85 折
              </p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="100">
              <p>
                <span class="date-new mr-2">2020 / 06 / 25</span>
                只要金額滿 1299 元，享有免運優惠
              </p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="150">
              <p>
                <span class="date-new mr-2">2020 / 06 / 19</span>
                MOUNTAIN 電商即將上市
              </p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="200">
              <p>
                <span class="date-new mr-2">2020 / 05 / 19</span>
                MOUNTAIN 整修中，敬請期待！
              </p>
            </li>
          </ul>
          <ul class="m-news-group">
            <li data-aos="fade-left">
              <p class="date-new">2020 / 07 / 19</p>
              <p>店長順利歸來，每人享有 7 折優惠：C7LI9M20BER</p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="50">
              <p class="date-new">2020 / 07 / 05</p>
              <p>店長成功登上世界最高峰，商品全面 85 折</p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="100">
              <p class="date-new">2020 / 06 / 25</p>
              <p>只要金額滿 1299 元，享有免運優惠</p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="150">
              <p class="date-new">2020 / 06 / 19</p>
              <p>MOUNTAIN 電商即將上市</p>
            </li>
            <li
              data-aos="fade-left"
              data-aos-delay="200">
              <p class="date-new">2020 / 05 / 19</p>
              <p>MOUNTAIN 整修中，敬請期待！</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div class="divider-bg">
      <h3 class="font-weight-bold">商品專區</h3>
    </div>
    <div class="home-footer">
      <HomeProducts />
    </div>
  </div>
</template>

<script>
/* global $ */
import HomeProducts from '@/components/frontend/HomeProducts.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
      },
    };
  },
  components: {
    HomeProducts,
    Swiper,
    SwiperSlide,
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
