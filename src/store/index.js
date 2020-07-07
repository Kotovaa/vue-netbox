import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {EDIT_ITEM, GET_DATA, REMOVE_ITEM} from "./types";

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const url = 'https://frontend-test.netbox.ru/'
export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    [GET_DATA]: (state, payload) => {
      const dataTable = [];
      payload.map(i => {
        dataTable.push(i)
        state.items = dataTable;
      })
    },
    [REMOVE_ITEM]: (state, payload) => {
      console.log(payload)
      state.items.splice(state.items.indexOf(payload), 1)
    },
  },
  actions: {
    [GET_DATA]: async ({ commit }) => {
      await axios.get(url)
          .then(resp => {
            commit(GET_DATA, resp.data)
          })
          .catch(e => {
            console.log(e)
          })
    },
    [REMOVE_ITEM]: async ({ commit }, item) => {
      await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        },
        withCredentials: true,
        data: {
          id: item[0].value
        }
      })
          .then(resp => {
            console.log('RESP', resp.data)
            commit(REMOVE_ITEM, item)
          })
          .catch(e => {
            console.log('ERR', e)
          })
    },
    [EDIT_ITEM]: ({ commit }, { id, name, age, phone, email }) => {
      const options = {
        method: 'update',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        },
        url: url,
        data: {
          id,
          name,
          age,
          phone,
          email
        },
      }
      axios(options)
        .then(resp => {
          console.log('RESP', resp.data)
          commit(GET_DATA)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  getters: {
    get_items: state => state.items
  },
  modules: {
  }
})
