<template>
  <div>
    <Header />
    <router-view
    class="content-pt"></router-view>
    <ScrollTop :style="{ opacity: isOpacity }"/>
    <Footer />
  </div>
</template>

<script>
import ScrollTop from '@/components/ScrollTop.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  components: {
    Header,
    ScrollTop,
    Footer,
  },
  data() {
    return {
      scrollTop: null,
      isOpacity: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 150) {
        this.isOpacity = 1;
      } else {
        this.isOpacity = 0;
      }
    });
  },
};
</script>
