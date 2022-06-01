import Vue from 'vue'
import Vuex from 'vuex'

import userDataResponse from '../user-data-response.json';
import fakeData from '../fake-data.json';
import StatusModel from '../models/StatusModel';

Vue.use(Vuex)

// 'https://api.lokeo.ru/api/users/login';
// Телефон: +79299318768
// Пароль: KP3gfU

const API_URI = 'https://api.lokeo.ru/api';

const store = new Vuex.Store({
  state: {
    user: null,
    userFeatures: null,

    apiToken: null,
    refreshToken: null,

    passList: [
      {
        id: "23470",
        vehicle: fakeData.Vehicle,
        kpp: fakeData.KPP,
        fio: "\u0421\u0435\u0440\u0435\u0431\u0440\u0435\u043d\u043d\u0438\u043a\u043e\u0432 \u041a\u043b\u0438\u043c \u041c\u0430\u043a\u0441\u0438\u043c\u043e\u0432\u0438\u0447",
        status: StatusModel.ACTIVATED.id,
        accessType: fakeData.AccessType[0],
      }
    ],
  },

  mutations: {
    mutateUserData(state, payload) {
      state.user = payload?.user ?? null;
      state.userFeatures = payload?.featurelist ?? null;
    },

    mutateApiToken(state, payload) {
      state.apiToken = payload?.token ?? null;
      state.refreshToken = payload?.refreshToken ?? null;
      
      const apiTokenData = payload ? JSON.stringify(payload) : payload;
      localStorage.setItem('api-token', apiTokenData);
    },

    mutatePassList(state, payload) {
      state.passList = payload;
    }
  },

  actions: {
    async signIn(store, payload) {
      try {
        const response = await fetch(`${API_URI}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        const { userData, token, refreshToken } = await response.json();

        store.commit('mutateUserData', userData);
        store.commit('mutateApiToken', { token, refreshToken });

        return userData;
        
      } catch (error) {
        return error;
      }
    },

    signOut(state) {
      state.commit('mutateUserData', null);
      state.commit('mutateApiToken', null);
    },
    
    // мне дали только ендпоинт логина, по этому юзера возьму из json с ответом /login
    fetchUser(store) {
      const { userData, token, refreshToken } = userDataResponse;

      store.commit('mutateUserData', userData);
      store.commit('mutateApiToken', { token, refreshToken });

      return userData;
    },

    createPass(store, payload) {
      // тут запросик
      
      console.log(store)
      store.commit('mutatePassList', [...store.state.passList, payload])
    },
  },

  modules: {
  }
})

export default store;
