import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Loader from '@/components/app/Loader';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: false,
  connection: process.env.VUE_APP_BACKEND,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

Vue.component('Loader', Loader);

new Vue({
  router,
  store,
  vuetify,
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
  },
  methods: {
      clickButton: function (data) {
          // $socket is socket.io-client instance
          this.$socket.emit('emit_method', data)
      }
  },
  render: h => h(App)
}).$mount('#app')
