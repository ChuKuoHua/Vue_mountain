<template>
  <div class="my-5">
    <div class="col-md-10 p-0 m-auto">
      <div class="success-box">
        <div class="w-50 left-content">
          <h5 class="order-logo">MOUNTAIN</h5>
          <div class="vrl">
            <p>感謝您的購買</p>
            <br>
            <p class="r-text">祝您登山愉悅</p>
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn font-weight-bolder"
              data-toggle="modal"
              data-target="#exampleModal">
              <i class="fas fa-angle-right"></i>
              查詢明細
              <i class="fas fa-angle-left"></i>
            </button>
          </div>
        </div>
        <div class="w-50">
          <div
            class="right-content"
            :style="{backgroundImage:`url('https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80')`}"
          ></div>
        </div>
      </div>
      <div class="pt-3">
        <router-link
          to="/products"
          class="text-dark">
          <i class="fas fa-reply mr-2"></i>
          繼續購買
        </router-link>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade mt-5 customer-modal-box"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog mt-5 px-5">
        <div class="modal-content">
          <div class="modal-header py-2 bg-complete">
            <h5
            class="modal-title text-dark font-weight-bolder"
            id="exampleModalLabel">購物明細</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </div>
          <div class="modal-body p-0">
            <div
              class="px-4"
            >
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
                <li class="py-2" style="border-top: 1px solid #00000024">
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
                          <strong
                            class="text-success"
                          >付款完成</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer p-1 bg-complete">
            <p>成立訂單後約 3 - 5 的工作天出貨。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
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
  },
};
</script>
