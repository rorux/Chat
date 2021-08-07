import axiosApiInstance from '@/utils/interceptor.js';

export default {
  namespaced: true,
  state: {
    id: null,
    login: null,
    chats: [],
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.id = userInfo.userId;
      state.login = userInfo.login;
      state.chats = userInfo.chats;
    },
    addChat(state, chat) {
      state.chats.push(chat);
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

    async newChat({commit}, data) {
      try {
        const res = await axiosApiInstance({
          method: data.type,
          url: process.env.VUE_APP_BACKEND + '/api/v1/user/chat',
          data: JSON.stringify(data.req)
        });
        commit('addChat', res.data.chat);
        commit('setSuccess', res.data.message, {root: true});
        return true;
      } catch (e) {
        commit('setError', e.response.data.message, {root: true});
        return false;
      }
    },
  },
}