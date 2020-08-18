<template>
  <div
    class="modal fade"
    id="delCouponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header del-mod-color text-white">
          <h5
            class="modal-title"
            id="exampleModalLabel"
          >
            <span>刪除優惠券</span>
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
        <div class="modal-body">
          是否刪除
          <strong class="text-danger font-weight-bold">
            {{ tempCoupon.title }}
          </strong>
          優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-cancel"
            data-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-del"
            @click="delCoupon"
          >
            確認刪除
          </button>
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
      uuid: process.env.VUE_APP_UUID,
    };
  },
  props: {
    tempCoupon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    delCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api)
        .then((res) => {
          $('#delCouponModal').modal('hide');
          this.$emit('update');
          if (res.status === 200) {
            Toast.fire({
              title: '優惠券刪除成功',
              icon: 'success',
            });
          } else {
            Toast.fire({
              title: '優惠券刪除失敗',
              icon: 'error',
            });
          }
        });
    },
  },
};
</script>
