<template>
  <div>
    <div
      id="deleteModal"
      class="modal fade"
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
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除資料</span>
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
            <div
              class="del-img-modal"
              :style="{ backgroundImage: `url(${tempData.path})` }"
            >
            </div>
            是否刪除該筆資料 (刪除後將無法恢復)。
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
              @click="deleteData"
            >
              確認刪除
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
      uuid: process.env.VUE_APP_UUID,
    };
  },
  props: {
    tempData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteData() {
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/storage/${this.tempData.id}`;

      this.$http.delete(url)
        .then(() => {
          $('#deleteModal').modal('hide');
          this.$emit('update');
          Toast.fire({
            title: '刪除成功',
            icon: 'success',
          });
        }).catch(() => {
          $('#deleteModal').modal('hide');
          Toast.fire({
            title: '刪除失敗',
            icon: 'error',
          });
        });
    },
  },
};
</script>
