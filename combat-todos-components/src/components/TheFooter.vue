<template>
  <footer
    class="footer"
    v-show="todos.length"
  >
    <span class="todo-count">
      <strong>{{count}}</strong>  items left
    </span>
    <ul class="filters">
      <li>
        <router-link to="/all"
          :class="{selected: filter === 'all'}"
          @click="handleFilter"
        >
          All
        </router-link>
      </li>
      <li>
        <router-link to="/active"
          :class="{selected: filter === 'active'}"
          @click="handleFilter"
        >
          Active
        </router-link>
      </li>
      <li>
        <router-link to="/completed"
          :class="{selected: filter === 'completed'}"
          @click="handleFilter"
        >
          Completed
        </router-link>
      </li>
    </ul>
    <button
      class="clear-completed"
      v-show="hasCompleted"
      @click="removeCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  created() {
    this.handleFilter();
  },
  watch: {
    $route: 'handleFilter',
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    count() {
      return this.$store.getters.count;
    },
    filter() {
      return this.$store.state.filter;
    },
    hasCompleted() {
      return this.$store.getters.hasCompleted;
    },
  },
  methods: {
    handleFilter() {
      const { filter } = this.$route.params;
      this.$store.commit('changeFilter', filter);
    },
    removeCompleted() {
      this.$store.commit('removeCompleted');
    },
  },
};
</script>
