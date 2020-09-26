<template>
  <div class="container">
    <b-field label="Add combatants to the initiative order">
      <b-input value=""></b-input>
      <b-button @click="clickMe">Add</b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "NewEntry",
  data() {
    return {};
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

</style>