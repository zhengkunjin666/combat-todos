<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      autocomplete="off"
      placeholder="What needs to be done?"
      ref="input"
      v-model="newTodo"
      @keyup.enter="handleAddTodo"
    >
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      newTodo: '',
    };
  },
  mounted() {
    this.$nextTick(() => this.$refs.input.focus());
  },
  methods: {
    handleAddTodo() {
      if (this.newTodo.trim()) {
        this.$store.commit('addTodo', {
          title: this.newTodo,
          completed: false,
          id: this.$store.state.id += 1,
        });
        this.newTodo = '';
      }
    },
  },
};
</script>
