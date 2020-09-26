<template>
  <div class="container">
    <b-field label="Name">
      <b-input value=""></b-input>
      <b-button @click="clickMe">Click Me</b-button>
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