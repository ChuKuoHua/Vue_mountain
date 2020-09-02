<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <Navbar />
    <div>
      <Sidebar />
      <router-view :token="token" v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/backend/Navbar.vue';
import Sidebar from '@/components/backend/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      token: '',
      isLoading: false,
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.isLoading = true;
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      // Axios 預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`;
      this.$http.post(api, { api_token: this.token })
        .then((res) => {
          // 登入成功
          if (res.data.success) {
            this.isLoading = false;
            this.checkSuccess = true;
          }
        }).catch(() => {
          // 驗證失敗，轉回登入頁
          this.isLoading = false;
          this.$router.push('/login');
        });
    },
  },
};
</script>
