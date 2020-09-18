<template>
  <div>
    <div class="products-banner">
      <h2
        class="text-center"
        v-if="filterType === ''"
      >全部商品</h2>
      <h2
        class="text-center"
        v-else
      >{{ filterType }}</h2>
    </div>
    <div class="container">
      <loading :active.sync="isLoading">
        <i class="loading-box"></i>
      </loading>
      <div class="row rwd-product-box">
        <nav class="col-md-3 pr-md-0">
          <ul
            class="list-group sticky-top"
          >
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="filterType = ''"
                :class="{ active: filterType === ''}"
              >全部商品</a>
            </li>
            <li class="list-group-item p-xy-0">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="filterType = '熱門商品'"
                :class="{ active: filterType === '熱門商品'}"
              >熱門商品</a>
            </li>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-btn"
                data-toggle="dropdown"
                :class="{ active: isActive }">
                商品分類
                <i class="fas fa-caret-down"></i>
              </a>
              <ul class="dropdown-menu dropdown-style">
                <li
                  class="dropdown-tags p-xy-0"
                  v-for="item in category"
                  :key="item">
                  <a
                    data-toggle="tab"
                    href="#"
                    class="list-btn"
                    @click.prevent="filterType = item"
                    :class="{ active: item === filterType}"
                  >
                    <i class="fas fa-hiking"></i>
                    {{ item }}
                  </a>
                </li>
              </ul>
            </li>
            <li
              class="list-group-item p-xy-0 des-list-group"
              v-for="item in category"
              :key="item">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="filterType = item"
                :class="{ active: item === filterType}"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="col-md-9 position-relative">
          <div class="sortData-box">
            <span>{{ getFilter.length }} 個商品</span>
            <select
              name="sortData"
              id="sortData"
              v-model="sortData"
              class="form-control sortData mb-3"
              @change="sortProducts()"
            >
              <option value="" disabled>商品排序</option>
              <option value="highToLow">價格由高至低</option>
              <option value="lowToHigh">價格由低至高</option>
            </select>
          </div>
          <div class="d-flex flex-wrap m-card-ground">
            <div
              class="card-flex shadow-sm"
              v-for="item in getFilter"
              :key="item.id"
            >
              <div
                class="item-img"
                :style="{ backgroundImage:`url(${ item.imageUrl[0] })` }"
              >
                <router-link
                  :to="`/product/${ item.id }`"
                  class="btn card-btn-box btn-sm"
                >
                  查看更多
                </router-link>
                <div
                  title="收藏"
                  class="icon-tags"
                  @click.prevent="addFollow(item.id)">
                  <i
                    v-if="followData.indexOf(item.id) === -1"
                    class="far fa-bookmark">
                  </i>
                  <i v-else class="fas fa-bookmark"></i>
                </div>
              </div>
              <div class="position-relative">
                <h5 class="text-center card-title font-weight-bold">
                  {{ item.title }}
                </h5>
              </div>
              <div class="d-flex flex-column position-relative">
                <div class="text-center price-box">
                  <span
                    class="origin-price-f mr-2"
                    v-if="item.origin_price !== 0"
                  >{{ item.origin_price | currency }}</span>
                  <span class="price-color">{{ item.price | currency }}</span>
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
            v-if="products.length >= 25"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Toast from '@/alert/Toast';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      category: [
        '登山背包．登山鞋',
        '登山杖',
        '帳篷．睡袋',
        '手電筒．頭燈',
      ],
      isActive: false,
      filterType: '',
      products: {},
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
    addFollow(id) {
      const followId = this.followData.indexOf(id);
      if (followId === -1) {
        this.followData.push(id);
        Toast.fire({
          title: '已加入收藏',
          icon: 'success',
        });
      } else {
        this.followData.splice(followId, 1);
        Toast.fire({
          title: '已取消收藏',
          icon: 'success',
        });
      }
      localStorage.setItem('followCard', JSON.stringify(this.followData));
    },
    sortProducts() {
      this.products.sort((a, b) => {
        if (this.sortData === 'lowToHigh') {
          return a.price - b.price;
        }
        if (this.sortData === 'highToLow') {
          return b.price - a.price;
        }
        return this.products;
      });
    },
    scrollTitle() {
      if (this.filterType === '' || this.filterType === '熱門商品') {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      $('html,body').animate({
        scrollTop: 0,
      }, 0);
    },
  },
  computed: {
    getFilter() {
      let filterData = [];
      switch (this.filterType) {
        case '登山背包．登山鞋':
          filterData = this.products.filter((item) => item.category === '登山背包．登山鞋');
          this.scrollTitle();
          break;
        case '登山杖':
          filterData = this.products.filter((item) => item.category === '登山杖');
          this.scrollTitle();
          break;
        case '帳篷．睡袋':
          filterData = this.products.filter((item) => item.category === '帳篷．睡袋');
          this.scrollTitle();
          break;
        case '手電筒．頭燈':
          filterData = this.products.filter((item) => item.category === '手電筒．頭燈');
          this.scrollTitle();
          break;
        case '熱門商品':
          filterData = this.products.filter((item) => item.options.hot === true);
          this.scrollTitle();
          break;
        default:
          filterData = this.products;
          this.scrollTitle();
          break;
      }
      return filterData;
    },
  },
};
</script>
