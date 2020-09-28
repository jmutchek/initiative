<template>
  <div class="container">
    <b-field label="What is your character's name?">
      <b-input v-model="newPlayer" @keyup.enter.native="clickMe"></b-input>
      <b-button @click="clickMe">Save</b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "NewPlayer",
  data() {
    return {
      newPlayer: ""
    };
  },
  methods: {
    async clickMe() {
      // this.$buefy.notification.open("Clicked!!");
      console.log("adding " + this.newPlayer + " to list")

      const newUser = {
        PartitionKey: "001",
        RowKey: this.newPlayer,
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
      await fetch("/api/combatants", options)
        .then((res) => res.json())
        // .then()
        .catch(error => {
          console.log(`${this.newPlayer} might already exist`, error)
          this.$buefy.notification.open({
            message: this.newPlayer + ' might already exist'
          });
        })
        // .then((res) => console.log(res));
        this.$emit('playerReady', this.newPlayer)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>