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
    removeChat(state, id) {
      state.chats = state.chats.filter(chat => chat._id !== id);
    },
  },
  actions: {
    async getUserInfo({ commit }, data) {
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

    async newChat({ commit }, data) {
      try {
        const res = await axiosApiInstance({
          method: data.type,
          url: process.env.VUE_APP_BACKEND + '/api/v1/user/chat',
          data: JSON.stringify(data.req)
        });
        commit('addChat', res.data.chat);
        commit('setSuccess', res.data.message, {root: true});
        return res.data.chat;
      } catch (e) {
        commit('setError', e.response.data.message, {root: true});
        return false;
      }
    },

    async removeChat({ commit }, id) {
      try {
        await axiosApiInstance({
          method: 'delete',
          url: process.env.VUE_APP_BACKEND + `/api/v1/user/chat/${id}`,
        });
        const activeChat = JSON.parse(localStorage.getItem('activeChat'));
        if(activeChat._id === id) localStorage.removeItem('activeChat');
        commit('removeChat', id);
      } catch (e) {
        console.log(e);
      }
    },

    async getChatsOwner() {
      try {
        const res = await axiosApiInstance({
          method: 'get',
          url: process.env.VUE_APP_BACKEND + '/api/v1/user/chat',
        });
        return res.data.chats;
      } catch (e) {
        console.log(e);
      }
    },
  },
}