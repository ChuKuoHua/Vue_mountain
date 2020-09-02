<template>
  <div>
    <div
      class="modal fade"
      id="delProductModal"
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
              <span>刪除產品</span>
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
              {{ tempProduct.title }}
            </strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-cancel"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-del"
              @click="delProductData"
            >確認刪除</button>
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
      uuid: process.env.VUE_APP_UUID,
    };
  },
  props: {
    tempProduct: {
      type: Object,
      required: true,
    },
  },
  methods: {
    delProductData() {
      this.isProcessing = true;
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
      this.$http.delete(api)
        .then(() => {
          $('#delProductModal').modal('hide');
          this.$emit('update');
          Toast.fire({
            title: '刪除成功',
            icon: 'success',
          });
        }).catch(() => {
          Toast.fire({
            title: '刪除失敗',
            icon: 'error',
          });
        });
    },
  },
};
</script>
