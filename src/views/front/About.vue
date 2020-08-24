<template>
  <div>
    <div class="about-banner position-relative">
      <div class="banner-tit">
        <p class="top-text">你可以喘氣，但不要洩氣。</p>
        <p>可以休息，但是不要放棄。</p>
      </div>
    </div>
    <div class="container">
      <div class="row about-content my-4 flex-nowrap">
        <div class="col-md-6 p-0 position-relative">
          <div class="left-content-bg">
          </div>
          <img class="imgbox" src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/8NhW84lmcoCX3bbWXqjV38EbiuL9TkPbFJlMtNyjCRS1UO7DVggjnGQOoDuoqxbxNuFnUp2x8S14bo6OYa0IuwwlLaNu2EXM638pYOKKLUYnI6MFLdwKVUUgtTLc5W7M.jpg" alt="">
        </div>
        <article class="col-md-6 right-content-box">
          <p class="right-content">
            我們是一群熱愛登山的登山員，完成數座百岳山，擁有相當豐富的登山經歷；
            不僅提供專業的諮詢服務，同時精選世界各地的優質商品，以專業、服務、品質為三大核心理念。
            創立 <span class="font-weight-bolder">MOUNTAIN</span> 不僅是讓消費者選到適合的商品，
            也期望變成熱愛登山的同好，共同交流彼此的經歷。
          </p>
        </article>
      </div>
    </div>
    <div class="about-footer">
      <div class=" text-center">
        <h2 class="mb-3">MOUNTAIN</h2>
        <div class="font-weight-bold">
          <h3 class="mb-4">聯絡我們</h3>
          <p>電話：02-1234567</p>
          <p>營業時間：9:00 - 20:00</p>
          <p>地址：南投縣信義鄉東埔村 007 號</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 50) {
        $('.imgbox').addClass('active');
      } else {
        $('.imgbox').removeClass('active');
      }
    });
  },
};
</script>
