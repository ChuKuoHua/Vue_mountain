<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="login-box">
      <div class="login-group">
        <div class="container">
          <form class="form-signin d-flex flex-column" @submit.prevent="signin">
            <div class="d-flex justify-content-between mb-3">
              <h1 class="h3 font-weight-normal m-0">
                後台登入
              </h1>
              <router-link
                to="/"
                class="btn btn-outline-trash">
                <i class="fas fa-home login-home"></i>
              </router-link>
            </div>
            <div class="form-group form-box">
              <label for="inputEmail" class="mb-2">帳號</label>
              <input id="inputEmail"
                v-model="user.email"
                type="email"
                class="form-control"
                placeholder="Email"
                required autofocus
              >
            </div>
            <div class="form-group form-box">
              <label for="inputPassword" class="mb-2">密碼</label>
              <input
                id="inputPassword"
                v-model="user.password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              >
            </div>
            <button
              class="btn btn-block login-btn"
              type="submit"
              :disabled="isLoading"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '@/alert/Toast';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;
      this.isLoading = true;
      this.$http.post(api, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token } = res.data;
          const { expired } = res.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)};`;
          this.$router.push('/admin/Products');
          Toast.fire({
            title: '登入成功',
            icon: 'success',
          });
        })
        .catch(() => {
          this.isLoading = false;
          Toast.fire({
            title: '帳號或密碼錯誤',
            icon: 'error',
          });
        });
    },
  },
};
</script>
