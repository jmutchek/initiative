<template>
  <div class="container">
    <h2>List</h2>
  </div>
</template>

<script>
export default {
  name: "InitiativeList",
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