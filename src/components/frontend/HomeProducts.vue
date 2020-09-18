<template>
  <section class="container">
    <div class="row mt-4 align-items-center">
      <div
        class="int-mb col-lg-6 col-md-12"
      >
        <div
          class="minor-img"
          style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/e9DZMWGq4LyoKDFKtB28F5rih5BgpgKHP5CKMk8YzNYGav2S7xgb7uyOQ55DTYNg7uxgqayP0OjfWXFwEdxQqKBN0wvreRRP3s8NvDeQlPQcbyYe1s1exngh7G8rtcgb.png)"
        >
          <div class="introTitle">
            <h4>帳篷</h4>
          </div>
          <a
            href="#"
            @click.prevent="toCategory('帳篷．睡袋')">
            <div
              class="primary-img"
              style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/e9DZMWGq4LyoKDFKtB28F5rih5BgpgKHP5CKMk8YzNYGav2S7xgb7uyOQ55DTYNg7uxgqayP0OjfWXFwEdxQqKBN0wvreRRP3s8NvDeQlPQcbyYe1s1exngh7G8rtcgb.png)">
            </div>
          </a>
        </div>
      </div>
      <div
        class="col-lg-6 col-md-12"
        data-aos="fade-up"
      >
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">帳篷</h5>
            <p class="my-3">登山帳篷是登山者最重要的保命裝備之一，選擇適合的登山帳篷，成為登山用的庇護所。</p>
            <a
              href="#"
              class="btn btn-outline-dark"
              @click.prevent="toCategory('帳篷．睡袋')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 align-items-center flex-row-reverse">
      <div
        class="int-mb col-lg-6 col-md-12"
      >
        <div
          class="minor-img ml-auto"
          style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/MAo39YjDoR2Vx27GCgEz0QeVhsF8alInIjQBP04WBfixUAwzGA9kt4UNe4F9gxwsApJUQIqExZgjHIbYhdODWKDDlWggdsOk8A3JhLq0q08bW2WVL9Eh069V9HFsxC0s.jpg)"
        >
          <div class="introTitle poles-title">
            <h4>登山杖</h4>
          </div>
          <a
            href="#"
            @click.prevent="toCategory('登山杖')">
            <div
              class="primary-img poles-img"
              style="background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/MAo39YjDoR2Vx27GCgEz0QeVhsF8alInIjQBP04WBfixUAwzGA9kt4UNe4F9gxwsApJUQIqExZgjHIbYhdODWKDDlWggdsOk8A3JhLq0q08bW2WVL9Eh069V9HFsxC0s.jpg)">
            </div>
          </a>
        </div>
      </div>
      <div
        class="col-lg-6 col-md-12"
        data-aos="fade-up"
      >
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">登山杖</h5>
            <p class="my-3">登山杖分有許多種類型，選擇適合自己的登山杖，須考慮到本身從事的戶外活動類型和地形。</p>
            <a
              href="#"
              class="btn btn-outline-dark"
              @click.prevent="toCategory('登山杖')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 align-items-center">
      <div
        class="int-mb col-lg-6 col-md-12"
      >
        <div
          class="minor-img"
          style="background-image: url(https://images.unsplash.com/photo-1502294624983-4ba589803a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80)"
        >
          <div class="introTitle">
            <h4>登山用品</h4>
          </div>
          <a
            href="#"
            @click.prevent="toCategory('登山背包．登山鞋')">
            <div
              class="primary-img"
              style="background-image: url(https://images.unsplash.com/photo-1502294624983-4ba589803a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80)">
            </div>
          </a>
        </div>
      </div>
      <div
        class="col-lg-6 col-md-12"
        data-aos="fade-up"
      >
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">登山用品</h5>
            <p class="my-3">裝備的規劃是為了降低登山的風險，選擇自己適合的裝備吧。</p>
            <a
              href="#"
              class="btn btn-outline-dark"
              @click.prevent="toCategory('登山背包．登山鞋')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toCategory(tag) {
      this.$router.push({
        name: 'products',
        params: { categoryName: tag },
      });
    },
  },
};
</script>
