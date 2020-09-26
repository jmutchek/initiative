<template>
  <div>
    <h1 class="title">Hello {{ value }}</h1>
    <section class="section">
      <NewEntry></NewEntry>
    </section>
    <section class="section">
      <InitiativeList></InitiativeList>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NewEntry from '@/NewEntry.vue'
import InitiativeList from '@/InitiativeList.vue'

export default {
  name: "App",
  components: {
    NewEntry,
    InitiativeList
  },
  data() {
    return {
      value: "World",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>