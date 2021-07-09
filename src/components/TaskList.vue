<template>
  <div>
    <h2>{{ title }}</h2>
    <p v-for="(task, index) in tasks" :key="title + index">
      {{ task.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "tasks"],
};
</script>

<style>
</style>