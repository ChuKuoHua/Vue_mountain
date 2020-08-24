<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div>
      <div
        class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-sm"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header modal-order-header">
              <h5
                class="modal-title"
                id="exampleModalLabel"
              >
                顧客資料
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div class="modal-bod modal-order-shadow">
              <ul class="text-left py-3 px-3">
                <li class="py-2">Email: {{order.user.email}}</li>
                <li class="py-2">收件人姓名: {{order.user.name}}</li>
                <li class="py-2">收件人電話: {{order.user.tel}}</li>
                <li class="py-2">收件人地址: {{order.user.address}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Toast from '@/alert/Toast';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  methods: {
    getOrder(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/orders/${id}`;
      this.$http.get(api)
        .then((res) => {
          this.order = res.data.data;
          $('#orderModal').modal('show');
          this.isLoading = false;
        })
        .catch(() => {
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
