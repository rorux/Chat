import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    primary: '#9652ff',
    success: '#00C853',
    info: '#ffaa2c',
    error: '#f83e70'
  }
});
