import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allTodos: state => state.todos
  },
  mutations: {},
  actions: {
    async fetchTodos() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log(response);
    }
  },
  modules: {}
});
