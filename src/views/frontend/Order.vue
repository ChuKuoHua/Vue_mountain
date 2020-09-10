<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <CartBanner />
    <div
      class="container cost-list-box"
      v-if="carts.length > 0"
    >
      <div class="row mobile-flex">
        <div class="col-lg-6 col-md-12 client-form-box">
          <div class="form-data-box p-4">
            <h3 class="font-weight-bold mb-3">訂單資料</h3>
            <validation-observer
              v-slot="{ invalid }"
            >
              <form @submit.prevent="createOrder">
                <!-- email -->
                <div class="pb-2">
                  <validation-provider
                    rules="required|email"
                    v-slot="{ errors, classes, passed }">
                    <label
                      class="pb-1"
                      for="email"
                    >Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      v-model.trim="form.email"
                      class="form-control"
                      placeholder="輸入 email"
                      :class="classes" />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                    <span
                      v-if="passed"
                      class="valid-feedback"
                    >
                      Email 正確
                    </span>
                  </validation-provider>
                </div>
                <!-- 收件人-->
                <div class="pb-2">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes, passed }"
                  >
                    <label
                      class="pb-1"
                      for="username"
                    >收件人姓名</label>
                    <input id="username"
                          type="text"
                          class="form-control"
                          name="name"
                          v-model.trim="form.name"
                          placeholder="輸入姓名"
                          :class="classes" />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                    <span v-if="passed"
                          class="valid-feedback">姓名正確</span>
                  </validation-provider>
                </div>
                <!-- 電話-->
                <div class="pb-2">
                  <validation-provider
                    rules="required|min:8"
                    v-slot="{ errors, classes, passed }"
                  >
                    <label
                      for="tel"
                      class="pb-1"
                    >收件人電話</label>
                    <input
                      id="tel"
                      type="tel"
                      class="form-control"
                      v-model.trim="form.tel"
                      placeholder="請輸入電話"
                      :class="classes" />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                    <span
                      v-if="passed"
                      class="valid-feedback"
                    >電話號碼正確</span>
                  </validation-provider>
                </div>
                <!-- 地址-->
                <div class="pb-2">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes, passed }">
                    <label
                      class="pb-1"
                      for="address"
                    >收件人地址</label>
                    <input
                      id="address"
                      type="text"
                      class="form-control"
                      name="address"
                      v-model.trim="form.address"
                      placeholder="請輸入地址"
                      :class="classes" />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                    <span
                      v-if="passed"
                      class="valid-feedback">地址正確</span>
                  </validation-provider>
                </div>
                <!-- 付款方式-->
                <div class="pb-2">
                  <label
                  class="pb-1"
                  for="payment">付款方式</label>
                  <select
                    id="payment"
                    v-model="form.payment"
                    class="form-control"
                    required>
                    <option
                      value=""
                      disabled
                    >
                      請選擇付款方式
                    </option>
                    <option value="WebATM">
                      WebATM
                    </option>
                    <option value="ATM">
                      ATM
                    </option>
                    <option value="CVS">
                      CVS
                    </option>
                    <option value="Barcode">
                      Barcode
                    </option>
                    <option value="Credit">
                      Credit
                    </option>
                    <option value="ApplePay">
                      ApplePay
                    </option>
                    <option value="GooglePay">
                      GooglePay
                    </option>
                  </select>
                </div>
                <!-- 留言-->
                <div class="pb-2">
                  <label
                    class="pb-1"
                    for="comment"
                  >留言</label>
                  <textarea
                    name="comment"
                    id="comment"
                    class="form-control"
                    cols="10"
                    rows="5"
                    v-model.trim="form.message"></textarea>
                </div>
                <div class="sent-from-btn">
                  <router-link
                    to="/cart"
                    class="text-dark mt-md-0 mt-3">
                    <i class="fas fa-reply mr-2"></i>
                    返回購物車
                  </router-link>
                  <button
                    class="btn btn-check checkout float-right"
                    :disabled="invalid"
                    :class="{ disabled: isProcessing }"
                  >
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="isProcessing"
                    >
                    </i>
                    <span>送出訂單</span>
                  </button>
                  <router-link
                    to="/cart"
                    class="m-return btn btn-outline-dark">
                    <i class="fas fa-reply mr-2"></i>
                    返回購物車
                  </router-link>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="mx-2 my-4 order-total-box">
            <h3 class="font-weight-bold mb-3">訂單總計</h3>
            <div
              class="my-3"
              v-for="item in carts"
              :key="item.product.id + 1">
              <div class="d-flex">
                <img
                  :src="item.product.imageUrl[0]"
                  alt=""
                  class="mr-2">
                <div class="w-100">
                  <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0">{{ item.product.title }}</p>
                    <p class="mb-0">x{{ item.quantity }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <small class="mb-0 text-muted">
                      {{ item.product.price | currency }} / {{ item.product.unit }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <table class="table total-table my-3 text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    class="border-0 px-0 pt-3 font-weight-normal"
                  >小計</th>
                  <td class="text-right border-0 px-0 pt-3">
                    {{ cartTotal | currency }}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    class="border-0 p-0 font-weight-normal"
                  >運費</th>
                  <td class="text-right border-0 p-0">
                    <div v-if="coupon.enabled">
                      <span v-if="((cartTotal * (coupon.percent / 100)) > 1299)"> NT 0</span>
                      <span v-else> NT 80</span>
                    </div>
                    <div v-else>
                      <span v-if="(cartTotal > 1299)"> NT 0</span>
                      <span v-else> NT 80</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2"
                      class="text-right border-0 px-0 pt-0 pb-4">
                    <div class="input-group mt-3 input-group-sm">
                      <input
                        type="text"
                        class="form-control m-coupon"
                        v-model="coupon_code"
                        placeholder="請輸入優惠碼" />
                      <div class="input-group-append">
                        <button
                          class="btn coupon-btn"
                          type="button"
                          @click.prevent="addCoupon"
                        >
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-2 totalnum-box">
              <p class="font-weight-bold">總計</p>
              <p v-if="coupon.enabled"
                class="font-weight-bold">
                <span v-if="(cartTotal * (coupon.percent / 100)) >= 1299">
                  {{ cartTotal * (coupon.percent / 100) | currency }}
                </span>
                <span v-else>
                  {{ (cartTotal * (coupon.percent / 100)) + 80 | currency }}
                </span>
              </p>
              <p
                class="font-weight-bold"
                v-else>
                <span v-if="cartTotal >= 1299">
                  {{ cartTotal | currency }}
                </span>
                <span v-else>
                  {{ cartTotal + 80 | currency }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartBanner from '@/components/frontend/CartBanner.vue';
import Toast from '@/alert/Toast';

export default {
  data() {
    return {
      carts: {},
      cartTotal: 0,
      form: {
        email: '',
        name: '',
        tel: '',
        address: '',
        payment: 'WebATM',
        message: '',
      },
      coupon_code: '',
      coupon: {},
      isLoading: false,
      isProcessing: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  components: {
    CartBanner,
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
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/coupon/search`;
      this.$http.post(url, { code: this.coupon_code })
        .then((res) => {
          this.getCart();
          this.isLoading = false;
          this.coupon = res.data.data;
          Toast.fire({
            text: '使用優惠卷',
            icon: 'success',
          });
        })
        .catch((err) => {
          const errorData = err.response.data.errors;
          if (errorData) {
            errorData.code.forEach((errmsg) => {
              Toast.fire({
                title: `${errmsg}`,
                icon: 'error',
              });
            });
            this.isLoading = false;
          } else {
            const { message } = err.response.data;
            Toast.fire({
              title: `${message}`,
              icon: 'error',
            });
            this.isLoading = false;
          }
        });
    },
    createOrder() {
      this.isLoading = true;
      this.isProcessing = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/orders`;
      const order = { ...this.form };

      // 如果有優惠卷就加入
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      this.$http.post(url, order)
        .then((res) => {
          this.$bus.$emit('update-total');
          Toast.fire({
            title: '訂單送出',
            icon: 'success',
          });
          this.$router.push(`/checkout/${res.data.data.id}`);
          this.getCart();
          this.isLoading = false;
          this.isProcessing = false;
        }).catch(() => {
          this.isProcessing = false;
          Toast.fire({
            title: '訂單失敗，請稍後再試！',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
  },
};
</script>
