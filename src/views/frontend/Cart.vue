<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <CartBanner />
    <div class="container my-5 m-cart-box">
      <div class="row align-items-center">
        <div class="col-lg-8 commodity-box">
          <div v-if="carts.length > 0">
            <table class="mt-3">
              <thead class="font-weight-bold">
                <tr>
                  <th></th>
                  <th class="text-left">商品</th>
                  <th class="text-center">
                    數量
                  </th>
                  <th>單位</th>
                  <th class="text-right">單價</th>
                </tr>
              </thead>
              <tbody class="border-y">
                <tr v-for="item in carts" :key="item.product.id + 1">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(item.product.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                  </td>
                  <td class="produce-num-td">
                    <div class="produce-num-group d-flex">
                      <div
                        class="num-btnbox"
                      >
                        <button
                          class="btn"
                          @click="quantityUpdata(item.product.id, item.quantity - 1)"
                          :disabled = "item.quantity <= 1"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        class="form-control text-center numbox"
                        :value="item.quantity"
                        @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                      />
                      <div class="num-btnbox">
                        <button
                          class="btn"
                          @click="quantityUpdata(item.product.id, item.quantity + 1)"
                          :disabled = "item.quantity >= 10"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td >
                    <span>/</span> {{ item.product.unit }}
                  </td>
                  <td class="text-right">
                    {{ item.product.price | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                      <button
                      type="button"
                      class="btn btn-del-all sideline btn-sm float-left my-3"
                      @click="removeAllCartItem()"
                    >
                      <i class="far fa-trash-alt">
                        <span class="pl-2">刪除所有商品</span>
                      </i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="mb-3 no-shop-box" v-else>
            <p class="py-5 mt-3">
              哎呀！您的購物車是空的，趕快去挑選裝備吧！
            </p>
            <router-link
              to="/products"
              class="text-dark"
            >
              <i class="fas fa-reply mr-2"></i>
              繼續購買
            </router-link>
          </div>
        </div>
        <div class="col-lg-4 my-3 card order-price">
          <div class="card-body">
            <h3>訂單價格</h3>
            <div class="px-4 mt-3">
              <p class=" d-flex justify-content-between">
                <span>小計：</span>
                <span>{{ cartTotal | currency }}</span>
              </p>
              <p
                class="d-flex fare justify-content-between"
                v-if="(cartTotal !== 0)"
              >
                <span>運費：</span>
                <span v-if="(cartTotal > 1299)"> NT 0</span>
                <span v-else> NT 80</span>
              </p>
              <hr class="m-0  my-2">
              <p class="text-right promotion">優惠促銷：滿 1299 免運</p>
              <p class=" d-flex justify-content-between">
                <span>總計：</span>
                <span>
                  {{ fareTotal | currency }}
                </span>
              </p>
              <hr class="hr-opa">
              <div
                class="mt-3 mb-2 check-box"
              >
                <div>
                  <router-link
                    to="/products"
                    class="text-dark"
                    v-if="carts.length > 0"
                  >
                  <i class="fas fa-reply mr-2"></i>
                    繼續購買
                  </router-link>
                </div>
                <div class="float-right">
                  <router-link
                    to="/order"
                    class="btn btn-check checkout"
                    :class="{ disabled: fareTotal <= 0 }"
                  >
                    結帳
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section
      class="bg-cart-footer"
      v-if="!isLoading"
    >
      <div class="container pt-4">
        <h4 class="font-weight-bold text-center h4">登山知識</h4>
        <div class="row mt-4 m-footer-cart">
          <div
            class="col-lg-4 col-md-6 mb-4"
            data-aos="zoom-in"
            data-aos-offset="200"
          >
            <div
            class="knowledge-img position-relative"
            style="background-image: url(https://images.unsplash.com/photo-1590395115794-c960459589d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1419&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">郊山</h5>
                <p class="px-4 my-3">位於約 1,000m-1,500m，難易度較低，適合想登山健走的朋友。</p>
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
            style="background-image: url(https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">中級山</h5>
                <p class="px-4 my-3">位於海拔約 1,000m-3,000m，介於郊山與百岳之間的山。來回通常需花上 2-3 天。</p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 mb-4"
            data-aos="zoom-in"
          >
            <div
            class="knowledge-img position-relative"
            style="background-image: url(https://images.unsplash.com/photo-1552590854-7a7d89b018ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)">
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">百岳</h5>
                <p class="px-4 my-3">百岳不是一座山，而是從台灣海拔 3,000m 以上的高山中，挑選出100座的高山做為百岳。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CartBanner from '@/components/frontend/CartBanner.vue';
import Toast from '@/alert/Toast';

export default {
  components: {
    CartBanner,
  },
  data() {
    return {
      carts: {},
      cartTotal: 0,
      fareTotal: 0,
      uuid: process.env.VUE_APP_UUID,
      isLoading: false,
      products: {},
      coupon_code: '',
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping`;
      this.$http.get(url)
        .then((res) => {
          this.carts = res.data.data;
          this.updateTotal();
          this.isLoading = false;
        }).catch(() => {
          Toast.fire({
            title: '資料讀取失敗，請稍後再試',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
    updateTotal() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      this.cartTotal = total;
      if (total >= 1299 || total === 0) {
        this.fareTotal = total;
      } else {
        this.fareTotal = total + 80;
      }
    },
    quantityUpdata(id, num) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http.patch(url, data)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.$bus.$emit('update-total');
          this.getCart();
          this.isLoading = false;
          Toast.fire({
            title: '商品已刪除',
            icon: 'success',
          });
        })
        .catch(() => {
          this.isLoading = false;
          Toast.fire({
            title: '商品刪除失敗',
            icon: 'error',
          });
        });
    },
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/shopping/all/product`;
      this.$http.delete(url)
        .then(() => {
          this.$bus.$emit('update-total');
          this.getCart();
          this.cartTotal = 0;
          this.isLoading = false;
          Toast.fire({
            title: '商品已全部刪除',
            icon: 'success',
          });
          this.$router.push('/products');
        }).catch(() => {
          this.isLoading = false;
          Toast.fire({
            title: '商品刪除失敗',
            icon: 'error',
          });
        });
    },
  },
};
</script>
