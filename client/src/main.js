import Vue from 'vue';
import App from './App.vue';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
//  import axios from 'axios';

// Vue.use(axios);
// axios.defaults.baseURL = 'http://localhost:5555/api';

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
}).$mount('#app');
