import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate'; // 驗證套件
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import $ from 'jquery';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
// css 樣式
import 'swiper/css/swiper.css';
import './assets/scss/all.scss';

Vue.config.productionTip = false;
window.$ = $;
// Loading
Vue.component('Loading', Loading);
// axios
Vue.use(VueAxios, axios);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
}); // 所有驗證規則
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('tw', zhTW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter('currency', currencyFilter);
Vue.filter('dateFilter', dateFilter);
Vue.use(VueAwesomeSwiper);

new Vue({
  created() {
    AOS.init({
      offset: 150,
      once: true,
      duration: 1500,
    });
  },
  router,
  render: (h) => h(App),
}).$mount('#app');
