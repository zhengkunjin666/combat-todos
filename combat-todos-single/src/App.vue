<template>
  <div class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="handleAddTodo"
      />
    </header>
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allCompleted"
      />
      <label
        for="toggle-all"
        v-show="todos.length"
      >
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
            />
            <label
              @dblclick="handleEdit(todo)"
            >
              {{todo.title}}
            </label>
            <button
              class="destroy"
              @click="removeTodo(todo)"
            ></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="editTodo === todo"
            @blur="handleEditDone(todo)"
            @keyup.enter="handleEditDone(todo)"
            @keyup.esc="handleEditCancel(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count"> <strong>{{count}}</strong>  items left </span>
      <ul class="filters">
        <li>
          <a
            href="#/all"
            :class="{selected: filter === 'all'}"
            @click="handleFilter('all')"
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            :class="{selected: filter === 'active'}"
            @click="handleFilter('active')"
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            :class="{selected: filter === 'completed'}"
            @click="handleFilter('completed')"
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="hasCompleted"
        @click="removecompleted"
      >
        Clear completed
      </button>
    </footer>
  </div>
</template>

<script>
import '@/assets/index.css';

export default {
  data () {
    return {
      id: 0,
      todos: [],
      editTodo: null,
      beforeEditCancel: null,
      newTodo: '',
      filter: 'all'
    }
  },
  methods: {
    handleEdit(todo) {
      this.editTodo=todo;
      this.beforeEditCancel=todo.title;
    },
    handleEditDone(todo) {
      if(todo.title.trim()) {
        this.editTodo=null;
        this.beforeEditCancel=null;
      }
    },
    handleEditCancel(todo) {
      todo.title=this.beforeEditCancel;
      this.editTodo=null;
      this.beforeEditCache=null;
    },
    handleAddTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          title: this.newTodo,
          completed: false,
          id: this.id++
        })
      }
      this.newTodo='';
    },
    removeTodo(todo) {
      let index=this.todos.indexOf(todo);
      this.todos.splice(index,1);
    },
    removecompleted() {
      this.todos=this.todos.filter(todo => !todo.completed);
    },
    handleFilter(filter) {
      this.filter=filter;
    }
  },
  directives: {
  'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  computed: {
    allCompleted: {
      get() {
        return this.todos.every(data => data.completed);
      },
      set(value) {
        this.todos.forEach(todo => todo.completed=value);
      }
    },
    count() {
      return this.todos.filter(data => !data.completed).length;
    },
    hasCompleted() {
      return this.todos.some(data => data.completed);
    },
    showTodos() {
      let filter=this.filter;
      return this.todos.filter(data => {
        if (filter === 'all') {
          return true;
        } if (filter === 'active') {
          return !data.completed;
        } if (filter === 'completed') {
          return data.completed;
        }
        return false;
      })
    }
  }
};
</script>
