import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    success: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    clearError(state, error) {
      state.error = '';
    },
    clearSuccess(state, success) {
      state.success = '';
    },
  },
  actions: {
  },
  modules: {
    auth,
  }
})
