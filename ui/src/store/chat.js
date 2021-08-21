import axiosApiInstance from '@/utils/interceptor.js';

export default {
  namespaced: true,
  state: {
    activeChat: null,
    members: []
  },
  mutations: {
    setActiveChat(state, chat) {
      state.activeChat = chat;
    },
    clearActiveChat(state) {
      state.activeChat = null;
    },
    setMembers(state, members) {
      state.members = members;
    },
    clearMembers(state) {
      state.members = [];
    },
    sortMembers(state, usersOnline) {
      const members = JSON.parse(JSON.stringify(state.members));
      const membersUpdate = members.map(user => usersOnline.includes(user.id) ? Object.assign(user, { active: true }) : Object.assign(user, { active: false }));
      const membersSort = membersUpdate.filter(user => user.active);
      membersUpdate.forEach(user => {
        if(!user.active) membersSort.push(user);
      })
      state.members = membersSort;
    }
  },
  actions: {
    async getMembers({ commit }, id) {
      try {
        const res = await axiosApiInstance({
          method: 'get',
          url: process.env.VUE_APP_BACKEND + `/api/v1/chat/member/${id}`,
        });
        commit('setMembers', res.data.members);
      } catch (e) {
        console.log(e);
      }
    },
  },
}