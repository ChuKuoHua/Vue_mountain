<template>
  <div>
    <div class="follow-banner">
      <h2 class="text-center">追蹤商品</h2>
    </div>
    <div
      class="container follow-box col-lg-6 col-md-12">
      <loading :active.sync="isLoading">
        <i class="loading-box"></i>
      </loading>
      <div class="follow-title">
        <h3>我的收藏
          <span>( {{ followProduct.length }} )</span>
        </h3>
        <select
          v-if="followProduct.length > 0"
          name="sortData"
          id="sortData"
          v-model="sortData"
          class="form-control follow-sort mb-2"
          @change="sortProduct()"
        >
          <option value="" disabled>商品排序</option>
          <option value="highToLow">價格由高至低</option>
          <option value="lowToHigh">價格由低至高</option>
        </select>
      </div>
      <div
        class="mb-5"
        v-if="followProduct.length > 0"
      >
        <div
          class="mb-3"
          v-for="item in followProduct"
          :key="item.id"
        >
          <div
            class="followItem"
            data-aos="fade-right"
          >
            <div class="d-flex">
              <router-link
                :to="`/product/${ item.id }`"
              >
                <img
                  class="followItem-img"
                  :src="item.imageUrl[0]"
                  alt=""
                >
              </router-link>
              <div class="followItem-content">
                <h5>{{ item.title }}</h5>
                <p>{{ item.content }}</p>
                <p class="followItem-category">{{ item.category }}</p>
              </div>
            </div>
            <div class="followItem-cart">
              <span
                class="followItem-origin-price pr-2"
                v-if="item.origin_price !== 0">
                {{ item.origin_price | currency }}
              </span>
              <span class="pr-2 followItem-price">
                {{ item.price | currency }}
              </span>
              <button
                type="button"
                class="btn btn-check"
                :disabled=" status.loadingItem === item.id"
                @click="addToCart(item.id, item.num)"
                >
                <i class="fas fa-spinner fa-spin"
                v-if="item.id === status.loadingItem"/>
                加到購物車
              </button>
            </div>
            <div class="m-followItem-cart">
              <div class="m-fol-money">
                <span
                  class="m-folItem-origin-price pr-2"
                  v-if="item.origin_price !== 0">
                  {{ item.origin_price | currency }}
                </span>
                <span class="pr-2 m-folItem-price">
                  {{ item.price | currency }}
                </span>
              </div>
              <button
                type="button"
                class="btn btn-folCart"
                :disabled=" status.loadingItem === item.id"
                @click="addToCart(item.id, item.num)"
                >
                <i class="fas fa-spinner fa-spin"
                v-if="item.id === status.loadingItem"/>
                加到購物車
              </button>
            </div>
            <button href="#"
              class="follow-close"
              @click.prevent="delFollow(item.id)">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <!-- 分頁 -->
        <Pagination
          class="text-right"
          :pages="pagination"
          @changePage="getProducts"
          v-if="products.length >= 25"
        ></Pagination>
      </div>
      <div v-else
      class="my-5 no-follow">
        <p>
          目前沒有收藏任何商品唷！
        </p>
        <router-link
          to="/products"
          class="text-cyanine"
        >
          <i class="fas fa-reply mr-2"></i>
          逛逛商品
        </router-link>
      </div>
    </div>
    <section
      class="bg-follow-footer"
      v-if="!isLoading"
    >
      <div class="container pt-4">
        <h4 class="font-weight-bold text-center h4">登山知識</h4>
        <div class="row mt-4 m-footer-follow">
          <div
            class="col-lg-4 col-md-6 mb-4"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <div
            class="knowledge-img position-relative"
            style="background-image: url(https://images.unsplash.com/photo-1524959725226-f4deb958e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">別執著於攻頂</h5>
                <p class="px-4 my-3">天氣不佳，不用執著於攻頂。寧可保守也不要過度冒險，人身安全還是最重要，記住，山，永遠都在。</p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 mb-4"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <div
            class="knowledge-img position-relative"
            style="background-image: url(https://images.unsplash.com/photo-1549538941-80646129626c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">無痕山林運動</h5>
                <p class="px-4 my-3">不把人為製造的垃圾留在山上。帶什麼東西上山，就要帶什麼下山。</p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 mb-4"
            data-aos="zoom-in"
          >
            <div
            class="knowledge-img position-relative"
            style="background-image: url(https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">山上無法吃得太豐盛</h5>
                <p class="px-4 my-3">盡可能減輕背包的重量，登山的餐食會以簡單的零食或乾糧為主。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Toast from '@/alert/Toast';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      products: {},
      followProduct: {},
      sortData: '',
      followData: JSON.parse(localStorage.getItem('followCard')) || [],
      pagination: {},
      carts: {},
      uuid: process.env.VUE_APP_UUID,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(pages = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/products?page=${pages}`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.getFollow();
          this.isLoading = false;
        }).catch(() => {
          Toast.fire({
            title: '資料讀取失敗，請稍後再試',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
    getFollow() {
      this.followProduct = this.products.filter((item) => this.followData.indexOf(item.id) > -1);
    },
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.post(url, cart)
        .then(() => {
          this.status.loadingItem = '';
          this.$bus.$emit('update-total');
          Toast.fire({
            title: '已加入購物車',
            icon: 'success',
          });
        }).catch((err) => {
          this.status.loadingItem = '';
          Toast.fire({
            title: `${err.response.data.errors}`,
            icon: 'warning',
          });
        });
    },
    delFollow(id) {
      const followId = this.followData.indexOf(id);
      if (followId !== -1) {
        this.followData.splice(followId, 1);
        Toast.fire({
          title: '已取消收藏',
          icon: 'success',
        });
      }
      localStorage.setItem('followCard', JSON.stringify(this.followData));
      this.getProducts();
    },
    sortProduct() {
      this.followProduct.sort((a, b) => {
        if (this.sortData === 'lowToHigh') {
          return a.price - b.price;
        }
        if (this.sortData === 'highToLow') {
          return b.price - a.price;
        }
        return this.followProduct;
      });
    },
  },
};
</script>
