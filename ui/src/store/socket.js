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
    SOCKET_newMessage({ commit }, message) {
      commit('message/addMessage', message, {root: true});
    },
    SOCKET_newMemberConnected({ commit }, member) {
      commit('chat/newMember', member, {root: true});
    },
    SOCKET_userRemovedChat({ commit }, user) {
      commit('chat/delMember', user.user, {root: true});
    },
    SOCKET_deleteChatByOwner({ dispatch }, chatId) {
      dispatch('chat/deleteChatByOwner', chatId, {root: true});
    },
  },
}