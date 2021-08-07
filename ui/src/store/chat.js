import axiosApiInstance from '@/utils/interceptor.js';

export default {
  namespaced: true,
  state: {
    activeChat: {},
  },
  mutations: {
    setActiveChat(state, chat) {
      state.activeChat = chat;
    }
  },
  actions: {
    
  },
  getters: {
    
  }
}