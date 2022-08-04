import { createStore } from 'vuex';

export default createStore({
  state: {
    id: -1,
    todos: [],
    filter: 'all',
  },
  getters: {
    allCompleted(state) {
      return state.todos.every((data) => data.completed);
    },
    count(state) {
      return state.todos.filter((data) => !data.completed).length;
    },
    showTodos(state) {
      const { filter } = state;
      return state.todos.filter((data) => {
        if (filter === 'all') {
          return true;
        } if (filter === 'active') {
          return !data.completed;
        } if (filter === 'completed') {
          return data.completed;
        }
        return false;
      });
    },
    hasCompleted(state) {
      return state.todos.some((data) => data.completed);
    },
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    setAllCompleted(state, status) {
      state.todos.forEach((todo) => {
        const todoObj = todo;
        todoObj.completed = status;
      });
    },
    reomveTodo(state, todo) {
      const index = state.todos.indexOf(todo);
      state.todos.splice(index, 1);
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
    removeCompleted(state) {
      state.todos = state.todos.filter((data) => !data.completed);
    },
  },
  actions: {
  },
  modules: {
  },
});
