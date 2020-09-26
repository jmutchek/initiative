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
