<template>
  <div>
    <section class="section">
      <h1 class="title">Initiative Order</h1>
      <InitiativeList></InitiativeList>
      <hr/>
      <h2 class="subtitle">DM Edits</h2>
      <NewEntry></NewEntry>
      <div class="actions">
        <b-button @click="clickMe">Clear Initiative Rolls</b-button>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NewEntry from "@/NewEntry.vue";
import InitiativeList from "@/InitiativeList.vue";

export default {
  name: "App",
  components: {
    NewEntry,
    InitiativeList,
  },
  data() {
    return {
      value: "World",
    };
  },
  methods: {
    clickMe() {
      this.$buefy.notification.open("Clicked!!");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.actions {
  margin-top: 24px;
}

</style>