export default {
  namespaced: true,
  state: {
    userSocketId: null,
    usersOnline: [],
  },
  mutations: {
    setUserSocketId(state, userSocketId) {
      state.userSocketId = userSocketId;
    },
    SOCKET_updateUsersOnline(state, usersOnline) {
      state.usersOnline = usersOnline
    }
  },
  actions: {
    async SOCKET_newMessage({ commit }, message) {
      commit('message/addMessage', message, {root: true});
    },
  },
}