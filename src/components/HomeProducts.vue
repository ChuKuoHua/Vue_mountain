<template>
  <div class="container">
    <h4 class="font-weight-bold mb-5 text-center h4">商品介紹</h4>
    <div class="row mt-4">
      <div class="col-md-4">
        <div
        class="introduc-img position-relative"
        style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/e9DZMWGq4LyoKDFKtB28F5rih5BgpgKHP5CKMk8YzNYGav2S7xgb7uyOQ55DTYNg7uxgqayP0OjfWXFwEdxQqKBN0wvreRRP3s8NvDeQlPQcbyYe1s1exngh7G8rtcgb.png)">
          <div class="introduc-box">
            <div class="int">
              <h5 class="font-weight-bolder pt-3 pb-2 pl-4">帳篷</h5>
              <p class="px-4 my-3">登山帳篷是登山者最重要的保命裝備之一，選擇適合的登山帳篷，成為登山用的庇護所。</p>
              <router-link
                class="btn btn-dark float-right"
                to="/products">
                查看商品
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div
        class="introduc-img position-relative"
        style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/MAo39YjDoR2Vx27GCgEz0QeVhsF8alInIjQBP04WBfixUAwzGA9kt4UNe4F9gxwsApJUQIqExZgjHIbYhdODWKDDlWggdsOk8A3JhLq0q08bW2WVL9Eh069V9HFsxC0s.jpg)">
          <div class="introduc-box">
            <div class="int">
              <h5 class="font-weight-bolder pt-3 pb-2 pl-4">登山杖</h5>
              <p class="px-4 my-3">登山杖分有許多種類型，選擇適合自己的登山杖，須考慮到本身從事的戶外活動類型和地形。</p>
              <router-link
                class="btn btn-dark float-right"
                to="/products">
                查看商品
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div
        class="introduc-img position-relative"
        style="background-image: url(https://images.unsplash.com/photo-1502294624983-4ba589803a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80)">
          <div class="introduc-box">
            <div class="int">
              <h5 class="font-weight-bolder pt-3 pb-2 pl-4">登山用品</h5>
              <p class="px-4 my-3">裝備的規劃是為了降低登山的風險，選擇自己適合的裝備吧。</p>
              <router-link
                class="btn btn-dark float-right sup-mt"
                to="/products">
                查看商品
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
