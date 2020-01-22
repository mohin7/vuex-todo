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
  mutations: {
    setTodos: (state, todos) => {
      return (state.todos = todos);
    },
    newTodo: (state, todo) => {
      return state.todos.unshift(todo);
    },
    removeTodo: (state, id) => {
      return (state.todos = state.todos.filter(todo => todo.id !== id));
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      commit("setTodos", response.data);
    },

    async addTodo({ commit }, title) {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );
      commit("newTodo", response.data);
    },

    async filterTodo({ commit }, e) {
      var limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      );

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
      commit("setTodos", response.data);
    },

    async deleteTodo({ commit }, id) {
      await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit("removeTodo", id);
    }
  },
  modules: {}
});
