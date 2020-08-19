<template>
  <div>
    <div class="products-banner">
      <h2 class="text-center">商品列表</h2>
    </div>
    <div class="container mt-3">
      <loading :active.sync="isLoading">
        <i class="loading-box"></i>
      </loading>
      <div class="position-relative pt-4 pb-5 mb-4 d-flex">
        <div class="col-md-3">
          <ul
            class="list-group sticky-top"
          >
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn active"
                @click.prevent="getFilter(filterType = 'all')"
              >全部商品</a>
            </li>
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="getFilter(filterType = 'pack')"
              >登山背包．登山鞋</a>
            </li>
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="getFilter(filterType = 'rod')"
              >登山杖</a>
            </li>
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="getFilter(filterType = 'tent')"
              >帳篷．睡袋</a>
            </li>
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="getFilter(filterType = 'light')"
              >手電筒．頭燈</a>
            </li>
          </ul>
        </div>
        <div class="col-md-9 position-relative">
          <div class="d-flex flex-wrap">
            <div class="card-flex shadow-sm" v-for="item in newProducts"
            :key="item.id">
              <div
                class="item-img"
                :style="{backgroundImage:`url(${ item.imageUrl[0] })`}"
              >
                <div class="card-btn-box border-top-0">
                  <router-link
                    :to="`/product/${ item.id }`"
                    class="btn btn-details btn-sm"
                  >
                    查看更多
                  </router-link>
                </div>
              </div>
              <h5 class="text-center card-title font-weight-bold">
                {{ item.title }}
              </h5>
              <div class="d-flex flex-column">
                <div class="text-right pr-3 price-box">
                  <span
                    class="origin-price-f mr-2"
                    v-if="item.origin_price !== 0"
                  >{{item.origin_price | currency}}</span>
                  <span class="price-color">{{item.price | currency}}</span>
                </div>
                <button
                  class="btn btn-shopping btn-sm"
                  :disabled="status.loadingItem === item.id"
                  type="button"
                  @click="addToCart(item.id)">
                  <i class="fas fa-spinner fa-spin"
                  v-if="item.id === status.loadingItem"/>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
          <!-- 分頁 -->
          <Pagination
            class="text-right"
            :pages="pagination"
            @changePage="getProducts"
            v-if="newProducts.length >= 25"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '@/alert/Toast';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      filterType: '',
      products: {},
      newProducts: {},
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
          this.newProducts = this.products;
          this.newProducts.sort((a, b) => b.price - a.price);
          this.pagination = res.data.meta.pagination;
          const { categoryName } = this.$route.params;
          if (categoryName) {
            this.filterType = categoryName;
          }
          this.isLoading = false;
        }).catch(() => {
          Toast.fire({
            title: '資料讀取失敗，請稍後再試',
            icon: 'error',
          });
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
    getFilter() {
      switch (this.filterType) {
        case 'all':
          this.newProducts = this.products;
          break;
        case 'pack':
          this.newProducts = this.products.filter((item) => item.category === '背包' || item.category === '登山鞋');
          break;
        case 'rod':
          this.newProducts = this.products.filter((item) => item.category === '登山杖');
          break;
        case 'tent':
          this.newProducts = this.products.filter((item) => item.category === '帳篷' || item.category === '睡袋');
          break;
        case 'light':
          this.newProducts = this.products.filter((item) => item.category === '燈具');
          break;
        default:
          break;
      }
    },
  },
};
</script>
