<template>
  <div class="todoapp">
    <the-header />
    <the-list />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheList from '@/components/TheList.vue';
import TheFooter from '@/components/TheFooter.vue';
import '@/assets/index.css';

export default {
  components: {
    'the-header': TheHeader,
    'the-list': TheList,
    'the-footer': TheFooter,
  },
};
</script>
