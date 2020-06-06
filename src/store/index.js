import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  user: null
};

const actions = {
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios
        .post("/auth/login/", params)
        .then(response => {
          if (response.data.authenticated === true) {
            commit("authSuccess", response.data);
            resolve(response);
          } else {
            var left = screen.width / 2 - 400 / 2;
            var top = screen.height / 2 - 350 / 2;
            var win = window.open(
              response.data.redirect,
              "Authentication",
              `width=400,height=350,top=${top},left=${left}`
            );
            var loop = setInterval(function() {
              if (win.closed) {
                clearInterval(loop);
                dispatch("refresh")
                  .then(resolve(response))
                  .catch(reject(response));
              }
            }, 500);
          }
        })
        .catch(err => {
          commit("authError", err);
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      axios.put(`/auth/logout/`).then(response => {
        resolve(response);
        commit("logout");
      });
    });
  },
  refresh({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/auth/me`)
        .then(response => {
          console.log("Session refresh success");
          commit("authSuccess", response.data);
          resolve(response);
        })
        .catch(error => {
          console.log("Session refresh fail");
          reject(error);
        });
    });
  }
};

const mutations = {
  authRequest(state) {
    state.user = null;
  },
  authSuccess(state, data) {
    state.user = data;
  },
  authError(state, error) {
    console.log(error);
    state.user = null;
  },
  logout(state) {
    state.user = null;
  }
};

const getters = {
  isAuthenticated: state => !!state.user,
  tokenSubject: state => state.user.user
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

export default store;
