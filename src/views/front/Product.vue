<template>
  <div>
    <div class="product-banner">
      <h2 class="text-center">商品介紹</h2>
    </div>
    <div class="container mt-3">
      <loading :active.sync="isLoading">
        <i class="loading-box"></i>
      </loading>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link
              to="/"
            >Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link
              to="/products"
            >全部商品</router-link>
          </li>
          <li
          class="breadcrumb-item active"
          aria-current="page"
          > {{ product.title }} </li>
        </ol>
      </nav>
      <section class="d-flex row product-box my-4">
        <div class="col-md-6">
          <img
            :src="product.imageUrl"
            alt=""
            class="product-img"
          >
        </div>
        <div class="col-md-6 pro-content-box pr-4">
          <div>
            <h4 class="pt-3 text-left" id="exampleModalLabel">
              {{ product.title }}
            </h4>
            <hr>
            <p class="mb-2">{{ product.content }}</p>
          </div>
          <div class="text-right">
            <span
              class="product-origin-price pr-2"
              v-if="product.origin_price !== 0">
              {{ product.origin_price | currency }}
            </span>
            <span class="pr-2 product-price">
              {{ product.price | currency }}
            </span>
          </div>
          <select name class="form-control my-3" v-model="product.num">
            <option value="0" disabled selected>
              請選擇數量
            </option>
            <option :value="num" v-for="num in 10" :key="num">
              {{ num }} {{ product.unit }}
            </option>
          </select>
          <div class="product-footer mb-3">
            <div v-if="product.num" class="subtotal-col text-nowrap mr-3">
              小計 <span class="text-lightgary">| </span>
              <strong>{{ product.num * product.price | currency }}</strong>
            </div>
            <button
              type="button"
              class="btn btn-check"
              :disabled=" status.loadingItem === product.id"
              @click="addToCart(product.id, product.num)"
              >
              <i class="fas fa-spinner fa-spin"
              v-if="product.id === status.loadingItem"/>
              加到購物車
            </button>
          </div>
        </div>
      </section>
      <nav>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >商品介紹</a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >購物須知</a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="return-tab"
              data-toggle="tab"
              href="#return"
              role="tab"
              aria-controls="return"
              aria-selected="false"
            >退換貨說明</a>
          </li>
        </ul>
      </nav>
      <section class="tab-content pl-3" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <p v-html="product.description"></p>
        </div>
        <div
          class="tab-pane fade"
          id="profile" role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Problem />
        </div>
        <div
          class="tab-pane fade"
          id="return" role="tabpanel"
          aria-labelledby="return-tab"
        >
          <ReturnNotice />
        </div>
      </section>
      <section class="col-md-12 sametype-box mb-4">
        <h5 class="font-weight-bold mb-3 h5">相關商品</h5>
        <Sametype
          :product="product"
          @update="getProduct" />
      </section>
    </div>
  </div>
</template>

<script>
import Toast from '@/alert/Toast';
import Sametype from '@/components/front/Sametype.vue';
import Problem from '@/components/front/Problem.vue';
import ReturnNotice from '@/components/front/ReturnNotice.vue';

export default {
  components: {
    Sametype,
    Problem,
    ReturnNotice,
  },
  data() {
    return {
      product: {
        num: 1,
      },
      isLoading: false,
      status: {
        loadingItem: '',
      },
      uuid: process.env.VUE_APP_UUID,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.data;
          this.$set(this.product, 'num', 1);
        }).catch(() => {
          this.isLoading = false;
        });
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
          this.$bus.$emit('update-total');
          this.status.loadingItem = '';
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
  },
};
</script>
