<template>
  <div class="container">
    <b-field label="Add combatants to the initiative order">
      <b-input v-model="newName" @keyup.enter.native="clickMe"></b-input>
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
    async clickMe() {
      // this.$buefy.notification.open("Clicked!!");
      console.log("adding " + this.newName + " to list")

      const newUser = {
        PartitionKey: "001",
        RowKey: this.newName,
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
          console.error(this.newName + ' might already exist', error)
          this.$buefy.notification.open({
            message: this.newName + ' might already exist',
            type: 'is-danger'
          });
        })
        // .then((res) => console.log(res));
        this.$eventHub.$emit('reload-list')
        this.newName = ""
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>