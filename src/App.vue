<template>
  <div>
    <section class='section'>
      <h1 class='title'>Initiative Order</h1>
  
      <div id='entrypoint' class='entrypoint' v-if="view === 'none'">
        <div class='door'>
          <b-button @click='enterDoor("DM")' class='centered is-large is-primary'>Enter as the DM</b-button>
        </div>
        <div class='door'>
          <b-button @click='enterDoor("PC")' class='centered is-large is-primary'>Enter as a Player</b-button>
        </div>
      </div>

      <div v-if="view === 'DM'">
        <InitiativeList></InitiativeList>
        <hr/>
        <NewEntry></NewEntry>
        <div class='actions'>
          <b-button @click='clearRolls' class='is-danger'>Clear Initiative Rolls</b-button>
        </div>
      </div>

      <div v-if="view === 'PC'">
        Nothing here yet
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
      view: "none",
    };
  },
  methods: {
    clearRolls() {
      // this.$buefy.notification.open("Clicked!!");
      this.$eventHub.$emit('clear-rolls')
    },
    enterDoor(role) {
      console.log ("entering the " + role + "'s view")
      this.view = role
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.actions {
  margin-top: 24px;
}

.entrypoint {
  display: flex;
}

.door {
  justify-content: center;
  align-items: center; 
  display: flex;
  height: 200px;
  flex: 1;
  margin: 10px;
  text-align: center;
}

.centered {
}

</style>