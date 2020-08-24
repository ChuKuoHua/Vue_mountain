<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div
      class="modal fade"
      id="couponModal"
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
          <div class="modal-header modal-header-color">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span v-if="status === 'created'">建立優惠券</span>
              <span v-else>更新優惠券</span>
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
          <div class="modal-body d-shadow">
            <div class="">
              <div class="form-group">
                <label
                  for="title"
                  class="mb-1 coupons-modal-label"
                >
                  標題
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupon.title"
                  placeholder="請輸入標題"
                  required
                >
              </div>
              <div class="form-group">
                <label
                  for="coupon_code"
                  class="mb-1 coupons-modal-label"
                >
                  優惠碼
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="coupon_code"
                  v-model="tempCoupon.code"
                  placeholder="請輸入優惠碼"
                  required
                >
              </div>
              <div class="form-group">
                <label
                  for="due_date"
                  class="mb-1 coupons-modal-label"
                >
                  到期日
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="due_date"
                  v-model="due_date"
                >
              </div>
              <div class="form-group">
                <label
                  for="due_time"
                  class="mb-1 coupons-modal-label"
                >
                  到期時間
                </label>
                <input
                  type="time"
                  class="form-control"
                  id="due_time"
                  v-model="due_time"
                  step="1"
                >
              </div>
              <div class="form-group">
                <label
                  for="price"
                  class="mb-1 coupons-modal-label"
                >
                  折扣百分比
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  v-model="tempCoupon.percent"
                  placeholder="請輸入折扣數量"
                  required
                >
              </div>
              <hr class="hr-my">
              <div class="form-group">
                <div class="form-check modal-checkbox text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.enabled"
                    :true-value="true"
                    :false-value="false"
                    id="enabled"
                  >
                  <label
                    class="form-check-label font-weight-bold"
                    for="enabled"
                  >
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer coupons-modal-footer">
            <button
              type="button"
              class="btn modal-btn product-cancel"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn modal-btn product-certain"
              @click="updateCoupon"
            >
              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
            </button>
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
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      due_date: '',
      due_time: '',
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  props: {
    status: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getCoupon(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          $('#couponModal').modal('show');
          this.tempCoupon = res.data.data;
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = [dedlineAt[0], dedlineAt[1]];
          this.isLoading = false;
        })
        .catch(() => {
          Toast.fire({
            title: '無法取得資料，請稍後再試',
            icon: 'error',
          });
          this.isLoading = false;
        });
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon`;
      let httpMethod = '';
      let message = '新增';
      if (this.status === 'created') {
        httpMethod = 'post';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon/${this.tempCoupon.id}`;
        message = '修改';
        httpMethod = 'patch';
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;

      this.$http[httpMethod](api, this.tempCoupon)
        .then(() => {
          $('#couponModal').modal('hide');
          this.$emit('update');
          this.tempCoupon = {};
          this.due_date = '';
          this.due_time = '';
          Toast.fire({
            title: `優惠卷${message}成功`,
            icon: 'success',
          });
        }).catch(() => {
          $('#couponModal').modal('hide');
          Toast.fire({
            title: `優惠卷${message}失敗`,
            icon: 'error',
          });
        });
    },
  },
  watch: {
    isNew(val) {
      if (val === true) {
        this.tempCoupon = {};
        this.due_date = '';
        this.due_time = '';
      }
    },
  },
};
</script>
