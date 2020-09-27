<template>
  <div class="container">
    <b-field label="Add combatants to the initiative order">
      <b-input v-model="newName"></b-input>
      <b-button @click="clickMe">Add</b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "NewEntry",
  data() {
    return {
      newName: ""
    };
  },
  methods: {
    clickMe() {
      // this.$buefy.notification.open("Clicked!!");
      const newUser = {
        PartitionKey: "001",
        Name: this.newName,
      };

      // request options
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // send POST request
      fetch("/api/combatants", options)
        .then((res) => res.json())
        .then((res) => console.log(res));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>