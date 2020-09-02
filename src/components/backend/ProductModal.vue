<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header modal-header-color">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span v-if="isNew">新增商品</span>
              <span v-else>修改商品</span>
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
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="updateProduct">
              <div class="modal-body d-shadow">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <validation-provider
                      rules="required"
                      class="form-group"
                      tag="div"
                      v-slot="{ errors, classes}"
                    >
                      <label
                        for="image"
                        class="modal-label"
                      >
                        輸入圖片網址
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="image"
                        v-model="tempProduct.imageUrl[0]"
                        placeholder="請輸入圖片連結"
                        :class="classes"
                        required />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                    <div class="form-group">
                      <label
                        for="customFile"
                        class="modal-label"
                      >
                        或 上傳圖片
                        <i
                          v-if="state.fileUpLoading"
                          class="fas fa-spinner fa-spin"
                        ></i>
                      </label>
                      <input
                        type="file"
                        id="customFile"
                        ref="files"
                        class="form-control form-input-border"
                        @change="uploadFile"
                      />
                    </div>
                    <img
                      class="img-fluid"
                      :src="tempProduct.imageUrl[0]"
                      alt=""
                    />
                  </div>
                  <div class="col-sm-8">
                    <validation-provider
                      rules="required"
                      class="form-group"
                      tag="div"
                      v-slot="{ errors, classes}"
                    >
                      <label
                        for="title"
                        class="mb-1 modal-label">商品名稱</label>
                      <input
                        type="text"
                        :class="classes"
                        class="form-control form-input-border"
                        id="title"
                        v-model="tempProduct.title"
                        placeholder="請輸入名稱" required
                      >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                    <div class="form-row">
                      <validation-provider
                        rules="required"
                        class="form-group col-md-6"
                        tag="div"
                        v-slot="{ errors, classes}"
                      >
                        <label
                          for="category"
                          class="mb-1 modal-label">分類</label>
                        <input
                          type="text"
                          :class="classes"
                          class="form-control form-input-border"
                          id="category"
                          v-model="tempProduct.category"
                          placeholder="請輸入分類" required
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                      <validation-provider
                        rules="required"
                        class="form-group col-md-6"
                        tag="div"
                        v-slot="{ errors, classes}"
                      >
                        <label
                          for="unit"
                          class="mb-1 modal-label">單位</label>
                        <input
                          type="unit"
                          class="form-control form-input-border"
                          id="unit"
                          :class="classes"
                          v-model="tempProduct.unit"
                          placeholder="請輸入單位" required
                        >
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-row">
                      <validation-provider
                        rules="required"
                        class="form-group col-md-6"
                        tag="div"
                        v-slot="{ errors, classes}"
                      >
                        <label
                          for="origin_price"
                          class="mb-1 modal-label">原價</label>
                        <input
                          type="number"
                          class="form-control form-input-border"
                          id="origin_price"
                          :class="classes"
                          v-model="tempProduct.origin_price"
                          placeholder="請輸入原價"
                          required>
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                      <validation-provider
                        rules="required"
                        class="form-group col-md-6"
                        tag="div"
                        v-slot="{ errors, classes}"
                      >
                        <label
                          for="price"
                          class="mb-1 modal-label">售價</label>
                        <input
                          type="number"
                          class="form-control form-input-border"
                          id="price"
                          v-model="tempProduct.price"
                          placeholder="請輸入售價"
                          :class="classes"
                          required
                        >
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <hr class="hr-my">
                    <validation-provider
                      rules="required"
                      tag="div"
                      v-slot="{ errors, classes}"
                    >
                      <label
                        for="depict"
                        class="mb-1 modal-label">產品描述</label>
                      <textarea
                        type="text"
                        class="form-control"
                        id="depict"
                        v-model="tempProduct.content"
                        placeholder="請輸入產品描述"
                        :class="classes"
                        required></textarea>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                    <validation-provider
                      rules="required"
                      class="form-group mt-3"
                      tag="div"
                      v-slot="{ errors, classes}"
                    >
                      <label
                        for="description"
                        class="mb-1 modal-label">說明內容</label>
                      <vue-editor
                        id="description"
                        class="text-left"
                        style="letter-spacing: 0px"
                        v-model="tempProduct.description"
                        :class="classes" />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                    <div class="d-flex justify-content-evenly">
                      <div class="form-group">
                        <div class="form-check modal-checkbox text-center">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="tempProduct.enabled"
                            :true-value="true"
                            :false-value="false"
                            id="enabled"
                          >
                          <label
                            class="form-check-label"
                            for="enabled"
                          >
                            是否啟用
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="form-check modal-checkbox text-center">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="tempProduct.options.hot"
                            :true-value="true"
                            :false-value="false"
                            id="hot"
                          >
                          <label
                            class="form-check-label"
                            for="hot"
                          >
                            熱門商品
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer modal-footer-col">
                <button
                  type="button"
                  class="btn modal-btn product-cancel"
                  data-dismiss="modal">取消</button>
                <button
                  type="submit"
                  class="btn modal-btn product-certain"
                  :disabled="invalid">確定</button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { VueEditor } from 'vue2-editor';
import Toast from '@/alert/Toast';

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      state: {
        fileUpLoading: false,
      },
      isLoading: false,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  props: {
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getProduct(id, type) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/product/${id}`;
      switch (type) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          this.isLoading = false;
          break;
        default:
          this.$http
            .get(api)
            .then((res) => {
              $('#productModal').modal('show');
              this.tempProduct = res.data.data;
              this.isLoading = false;
            })
            .catch(() => {
              Toast.fire({
                title: '資料讀取失敗，請稍後再試',
                icon: 'error',
              });
              this.isLoading = false;
            });
          break;
      }
    },
    updateProduct() {
      this.isLoading = true;
      // 新增商品
      let api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/product`;
      let httpMethod = 'post';
      // 如果不是新增商品則切換成編輯商品 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }

      this.$http[httpMethod](api, this.tempProduct)
        .then(() => {
          Toast.fire({
            title: '編輯成功',
            icon: 'success',
          });
          this.$emit('update');
          this.isLoading = false;
        })
        .catch(() => {
          Toast.fire({
            title: '編輯失敗',
            icon: 'error',
          });
          this.isLoading = false;
        });
      $('#productModal').modal('hide');
    },
    uploadFile() {
      const uploadedfile = document.querySelector('#customFile').files[0];
      const formData = new FormData();
      formData.append('file', uploadedfile);
      const url = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/storage`;
      this.state.fileUpLoading = true;

      this.$http
        .post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data"',
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.tempProduct.imageUrl.push(res.data.data.path);
            document.querySelector('#customFile').value = '';
            this.state.fileUpLoading = false;
          }
        })
        .catch(() => {
          Toast.fire({
            title: '檔案格式不符',
            icon: 'error',
          });
          $('#customFile').value = '';
          this.state.fileUpLoading = false;
        });
    },
  },
};
</script>

<style lang="css">
@import '~vue2-editor/dist/vue2-editor.css';

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
