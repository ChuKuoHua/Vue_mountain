<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="col-md-10 ml-sm-auto px-4 mt-5">
      <div class="text-left mr-2 mt-2 pt-2e">
        <button
          class="btn backs-btn-add"
          @click="openCouponModal('created')"
        >
          建立新的優惠券
        </button>
      </div>
      <table class="table table-striped mt-2">
        <thead class="thead-col font-weight-bold">
          <tr class="text-left">
            <th width="130">
              名稱
            </th>
            <th width="100">
              折扣百分比
            </th>
            <th width="130" class="text-center">
              到期日
            </th>
            <th width="100" class="text-right">
              是否啟用
            </th>
            <th width="130" class="text-right">
              編輯
            </th>
          </tr>
        </thead>
        <tbody class="flex text-left">
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{item.title}}</td>
            <td>{{item.percent}}</td>
            <td class="text-center">{{item.deadline.datetime}}</td>
            <td class="text-right">
              <span
                v-if="item.enabled"
                class="text-success"
              >啟用</span>
              <span
                v-else
                class="text-secondary"
              >未啟用</span>
            </td>
            <td class="text-right">
              <button
                class="btn btn-outline-primary btn-sm mr-2"
                @click="openCouponModal('edit',item)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-outline-trash btn-sm"
                @click="openCouponModal('delete',item)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Coupons Modal -->
      <CouponModal
        ref="couponModal"
        :status = "status"
        :isNew="isNew"
        @update="getCoupons"
      />
      <!-- 刪除 Modal -->
      <DelCouponModal
        :temp-coupon="tempCoupon"
        @update="getCoupons"
      />
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import CouponModal from './components/CouponModal.vue';
import DelCouponModal from './components/DelCouponModal.vue';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      status: '',
      isLoading: false,
      isNew: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  components: {
    CouponModal,
    DelCouponModal,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupons`;

      this.$http.get(url).then((res) => {
        this.coupons = res.data.data;
        this.isLoading = false;
      });
    },
    openCouponModal(status, item) {
      this.status = status;
      switch (status) {
        case 'created':
          this.$refs.tempCoupon = {};
          $('#couponModal').modal('show');
          this.isNew = true;
          break;
        // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.$refs.couponModal.getCoupon(item.id);
          this.isNew = false;
          break;
        }
        case 'delete':
          $('#delCouponModal').modal('show');
          this.tempCoupon = { ...item };
          break;
        default:
          break;
      }
    },
  },
};
</script>
