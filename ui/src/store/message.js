import axiosApiInstance from '@/utils/interceptor.js';

export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
  actions: {
    async getMessages({ commit }, id) {
      try {
        const res = await axiosApiInstance({
          method: 'get',
          url: process.env.VUE_APP_BACKEND + `/api/v1/message/chat/${id}`,
        });
        commit('setMessages', res.data.messages);
      } catch (e) {
        console.log(e);
      }
    },
    async addMessage({ commit }, data) {
      try {
        const res = await axiosApiInstance({
          method: 'post',
          url: process.env.VUE_APP_BACKEND + '/api/v1/message',
          data: JSON.stringify(data)
        });
        //commit('addMessage', res.data.message);
      } catch (e) {
        commit('setError', e.response.data.message, {root: true});
        console.log(e);
      }
    },
  },
}