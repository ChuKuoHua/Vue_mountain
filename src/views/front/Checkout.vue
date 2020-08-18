<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <CartBanner />
    <div class="container">
      <div
        class="my-5"
        v-if="!order.paid">
        <div class="col-md-5 mt-3 order-data-box">
          <div class="card">
            <div
              class="complete-nav py-2
              bg-undone text-white"
            >
              <i class="fas fa-tasks"></i>
              <h3 class="ml-2">訂單付款</h3>
            </div>
            <div class="px-4">
              <ul>
                <li class="py-2">
                  <table class="mt-2 w-100">
                    <thead
                      class="font-weight-bold"
                      style="border-bottom: 1px solid #00000024"
                    >
                      <tr>
                        <th class="pb-2">產品名稱</th>
                        <th class="text-center">數量</th>
                        <th class="text-right">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                      v-for="( product, i ) in order.products" :key="i">
                        <td class="pt-2">{{ product.product.title }}</td>
                        <td class="text-center">
                          {{ product.quantity }} /
                          {{ product.product.unit }}
                        </td>
                        <td class="text-right">
                          {{ product.product.price | currency }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li
                  class="py-2"
                  style="border-top: 1px solid #00000024"
                >
                  <div
                    class="d-flex justify-content-between"
                    v-if="(order.amount < 1299)"
                  >
                    <p>運費</p>
                    <p>NT 80</p>
                  </div>
                  <div
                    class="d-flex justify-content-between"
                    v-if="isEnabled"
                  >
                    <p>優惠券</p>
                    <p> {{order.coupon.title}} </p>
                  </div>
                </li>
                <li class="pt-2 d-flex justify-content-between border-0">
                  <p>總金額</p>
                  <p class="text-right">
                    <span v-if = "order.amount >= 1299">
                      {{ order.amount | currency }}
                    </span>
                    <span v-else>
                      {{ order.amount + 72 | currency }}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <hr>
            <div class="px-4">
              <ul class="customer-data">
                <li>
                  <h4 class="text-center font-weight-bold my-2">顧客資料</h4>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row"
                            class="border-0 px-0">Email</th>
                        <td class="text-right border-0 px-0">
                          {{ order.user.email }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"
                            class="border-0 p-0">顧客姓名</th>
                        <td class="text-right border-0 p-0">
                          {{ order.user.name }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"
                            class="border-0 px-0">顧客電話</th>
                        <td class="text-right border-0 px-0">
                          {{ order.user.tel }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"
                            class="border-0 p-0">顧客地址</th>
                        <td class="text-right border-0 p-0">
                          {{ order.user.address }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li class="px-0">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row"
                            class="border-0 px-0">付款方式</th>
                        <td class="text-right border-0 px-0">
                          {{ order.payment }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"
                            class="border-0 px-0 pt-0">付款狀態
                        </th>
                        <td class="text-right border-0 px-0 pt-0">
                          <span class="text-danger" v-if="!order.paid">尚未付款</span>
                          <strong
                            v-else
                            class="text-success"
                          >付款完成</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
            <div class="px-4 py-3 footer-data-box bg-undone">
              <a
                href="#"
                @click.prevent="comeBack"
                class="text-dark"
                v-if="order.paid === false"
              >
                <i class="fas fa-reply mr-2"></i>
                回首頁
              </a>
              <div
                class="text-right"
                v-if="order.paid === false"
              >
                <button
                  class="btn btn-outline-dark border-0 font-weight-bolder"
                  @click.prevent="payOrder"
                  :disabled="isProcessing">
                  <i class="fas fa-spinner fa-spin"
                    v-if="isProcessing">
                  </i>
                  確認付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Successful
        v-else
      />
    </div>
  </div>
</template>

<script>
import CartBanner from '@/components/CartBanner.vue';
import Successful from '@/components/Successful.vue';
import Toast from '@/alert/Toast';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isEnabled: false,
      uuid: process.env.VUE_APP_UUID,
      isLoading: false,
      isProcessing: false,
    };
  },
  components: {
    CartBanner,
    Successful,
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/orders/${this.orderId}`;
      this.$http.get(url)
        .then((res) => {
          this.order = res.data.data;
          if (this.order.coupon === null) {
            this.isEnabled = false;
          } else {
            this.isEnabled = true;
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
    payOrder() {
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/ec/orders/${this.orderId}/paying`;
      this.isProcessing = true;
      this.$http.post(url)
        .then((res) => {
          if (res.data.data.paid) {
            this.getOrder();
            Toast.fire({
              title: '付款成功',
              icon: 'success',
            });
          }
          this.isProcessing = false;
        }).catch(() => {
          Toast.fire({
            title: '付款失敗，請稍後再試',
            icon: 'error',
          });
          this.isProcessing = false;
        });
    },
    comeBack() {
      this.$router.push('/');
      Toast.fire({
        title: '尚未付款',
        icon: 'warning',
      });
    },
  },
};
</script>
