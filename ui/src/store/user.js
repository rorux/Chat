import axiosApiInstance from '@/utils/interceptor.js';

export default {
  namespaced: true,
  state: {
    userInfo: null,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async getUserInfo({commit}, data) {
      try {
        const res = await axiosApiInstance({
          method: 'get',
          url: process.env.VUE_APP_BACKEND + '/api/v1/user',
        });
        commit('setUserInfo', res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
}