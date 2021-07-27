import axios from 'axios';

export default {
  namespaced: true,
  actions: {
    async register({commit}, data) {
      try {
        const res = await axios({
          method: 'post',
          url: process.env.VUE_APP_BACKEND + '/api/v1/auth/signup',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(data)
        });
        commit('setSuccess', res.data.message, {root: true});
        return true;
      } catch (e) {
        commit('setError', e.response.data.message, {root: true});
        return false;
      }
    },

    async authorization({commit}, data) {
      try {
        const res = await axios({
          method: 'post',
          url: process.env.VUE_APP_BACKEND + '/api/v1/auth/login',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(data)
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        return true;
      } catch (e) {
        commit('setError', e.response.data.message, {root: true});
        return false;
      }
    },
  },
}