<template>
  <div>
    <Swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide
        v-for="item in identical"
        :key="item.id"
      >
        <div
        class="shopping border-0 shadow"
        @click.prevent="getDetail(item.id)">
          <div class="over-hidden">
            <div
              class="identical-img"
              :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
            >
            </div>
          </div>
          <div class="same-content">
            <h5 class="text-left mb-3">
              {{ item.title }}
            </h5>
            <div class="text-right">
              <span
                class="product-origin-price pr-2"
                v-if="item.origin_price !== 0"
              >
                {{ item.origin_price | currency }}
              </span>
              <span>
                {{ item.price | currency }}
              </span>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
  </div>
</template>

<script>
import Toast from '@/alert/Toast';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      products: [],
      uuid: process.env.VUE_APP_UUID,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/products`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.data;
        })
        .catch(() => {
          Toast.fire({
            title: '資料讀取失敗，請耐心等待',
            icon: 'error',
          });
        });
    },
    getDetail(id) {
      this.$router.push(`/product/${id}`);
      this.$emit('update');
    },
  },
  computed: {
    identical() {
      return this.products.filter(
        (item) => item.id !== this.product.id && item.category === this.product.category,
      );
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>
