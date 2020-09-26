<template>
  <div>
    <h1 class="title">Hello {{ value }}</h1>
     <section class="section">
      <NewEntry></NewEntry>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NewEntry from '@/NewEntry.vue'

export default {
  name: "App",
  components: {
    NewEntry
  },
  data() {
    return {
      value: "World",
    };
  },
};
</script>
