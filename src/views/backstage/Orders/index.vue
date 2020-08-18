<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="col-md-10 ml-sm-auto px-4 mt">
      <table class="table table-striped mt-5">
        <thead class="ord-thead-col font-weight-bold">
          <tr class="text-left">
            <th>下單時間</th>
            <th>購買款項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>客戶資料</th>
          </tr>
        </thead>
        <tbody
          v-if="orders.length"
          class="flex text-left"
        >
          <tr
            v-for="(item, key) in orders"
            :key="key"
            :class="{'text-secondary': !item.is_paid}"
          >
            <td>{{ item.created.datetime }}</td>
            <td>
              <ul class="list-unstyled">
                <li
                  v-for="(product, i) in item.products"
                  :key="i"
                >
                  {{ product.product.title }}
                  數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>
              {{ item.payment }}
            </td>
            <td>
              {{ item.amount | currency}}
            </td>
            <td class="text-left">
              <div class="custom-control custom-switch">
                <input
                  :id="item.id"
                  v-model="item.paid"
                  type="checkbox"
                  class="custom-control-input"
                  @change="setOrderPaid(item)"
                >
                <label
                  class="custom-control-label"
                  :for="item.id"
                >
                  <strong
                    v-if="item.paid"
                    class="text-success"
                    style="line-height:23px"
                  >已付款</strong>
                  <span
                    v-else
                    class="text-muted"
                    style="line-height:23px"
                  >尚未付款</span>
                </label>
              </div>
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm mr-1"
                @click.prevent="openModal(item)">
                <i class="fas fa-id-card"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁 -->
      <Pagination
        :pages="pagination"
        @changePage="getOrders"
      />
      <!-- 客戶資料 -->
      <OrderModal ref="orderModal"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Toast from '@/alert/Toast';
import OrderModal from './components/OrderModal.vue';

export default {
  components: {
    Pagination,
    OrderModal,
  },
  data() {
    return {
      orders: {
        user: {},
      },
      isNew: false,
      pagination: {},
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(pages = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/orders?page=${pages}`;

      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          Toast.fire({
            title: '資料讀取失敗，請稍後再試',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
    setOrderPaid(item) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/orders/${item.id}/paid`;

      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/orders/${item.id}/unpaid`;
      }

      this.$http.patch(url, item.id)
        .then(() => {
          Toast.fire({
            title: '付款狀態已修改',
            icon: 'success',
          });
          this.isLoading = false;
          this.getOrders();
        }).catch(() => {
          Toast.fire({
            title: '付款失敗',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
    openModal(item) {
      this.$refs.orderModal.getOrder(item.id);
    },
  },
};
</script>
