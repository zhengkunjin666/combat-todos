<template>
  <section class="main">
    <label
      for="toggle-all"
      v-show="todos.length"
    >
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allCompleted"
      >
      <span>❯</span>
      Mark all as complete
    </label>
    <ul class="todo-list">
      <li
        :class="['todo',
        {completed: todo.completed},
        {editing: editTodo === todo}]"
        v-for="todo in showTodos"
        :key="todo.id"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            v-model="todo.completed"
          >
          <span
            @dblclick="handleEdit(todo)"
          >
            {{todo.title}}
          </span>
          <button class="destroy" @click="handleRemoveTodo(todo)"></button>
        </div>
        <input
          class="edit"
          type="text"
          v-model="todo.title"
          v-todo-focus="editTodo === todo"
          @blur="handleEditDone(todo)"
          @keyup.enter="handleEditDone(todo)"
          @keyup.esc="handleEditCancel(todo)"
        >
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'TheList',
  data() {
    return {
      editTodo: null,
      beforeEditCancel: null,
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    showTodos() {
      return this.$store.getters.showTodos;
    },
    allCompleted: {
      get() {
        return this.$store.getters.allCompleted;
      },
      set(value) {
        this.$store.commit('setAllCompleted', value);
      },
    },
  },
  methods: {
    handleEdit(todo) {
      this.editTodo = todo;
      this.beforeEditCancel = todo.title;
    },
    handleEditDone(todo) {
      if (todo.title.trim()) {
        this.editTodo = null;
        this.beforeEditCancel = null;
      }
    },
    handleEditCancel(todo) {
      const todoObj = todo;
      todoObj.title = this.beforeEditCancel;
      this.editTodo = null;
      this.beforeEditCancel = null;
    },
    handleRemoveTodo(todo) {
      this.$store.commit('reomveTodo', todo);
    },
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>
