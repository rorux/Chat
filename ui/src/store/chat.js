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
    newMember(state, member) {
      state.members.push(member);
    },
    delMember(state, userId) {
      const members = JSON.parse(JSON.stringify(state.members));
      state.members = members.filter(user => user.id !== userId);
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
    async getChat(_, id) {
      try {
        const res = await axiosApiInstance({
          method: 'get',
          url: process.env.VUE_APP_BACKEND + `/api/v1/chat/${id}`,
        });
        return res.data.chat;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async setActiveChat({ commit }, chat) {
      localStorage.setItem("activeChat", JSON.stringify(chat))
      commit('setActiveChat', chat);
    },
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

    async fullDeleteChat(_, id) {
      try {
        await axiosApiInstance({
          method: 'delete',
          url: process.env.VUE_APP_BACKEND + `/api/v1/chat/${id}`,
        });
        const activeChat = JSON.parse(localStorage.getItem('activeChat'));
        if(activeChat._id === id) localStorage.removeItem('activeChat');
      } catch (e) {
        console.log(e);
      }
    },

    async deleteChatByOwner({ commit }, chatId) {
      const activeChat = JSON.parse(localStorage.getItem("activeChat"));
      if(activeChat._id === chatId) {
        const errMessage = `Чат "${activeChat.name}" удален владельцем!`;
        commit('clearActiveChat');
        localStorage.removeItem("activeChat");
        commit('clearMembers');
        commit('message/clearMessages', null, {root: true});
        commit('user/removeChat', chatId, {root: true});
        commit('setError', errMessage, {root: true});
      }
    },
  },
}