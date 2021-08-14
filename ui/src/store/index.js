import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import user from './user';
import chat from './chat';
import message from './message';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    success: null,
    primary: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    setPrimary(state, primary) {
      state.primary = primary;
    },
    clearError(state, error) {
      state.error = '';
    },
    clearSuccess(state, success) {
      state.success = '';
    },
    clearPrimary(state, primary) {
      state.primary = '';
    },
  },
  actions: {
  },
  modules: {
    auth,
    user,
    chat,
    message
  }
})
