<template>
  <div>
    <section class='section'>

      <div class='headers'>
        <div class=''><h1 class='title'>Initiative Order</h1></div>
        <div class='hright'>
          <b-icon icon="sync-alt" 
            v-if="view !== 'none'"
            size="is-medium" 
            :type="refreshingType">
          </b-icon>
        </div>
      </div>
      
      <div id='entrypoint' class='entrypoint' v-if="view === 'none'">
        <div class='door'>
          <b-button @click='enterDoor("DM")' class='centered is-large is-primary'>I am the DM</b-button>
        </div>
        <div class="door">
          <b-field :type="passphraseInputStyle" :message="passphraseInputMessage">
            <b-input v-model="passphrase" ></b-input>
          </b-field>
        </div>
        <div class='door'>
          <b-button @click='enterDoor("PC")' class='centered is-large is-primary'>I am a Player</b-button>
        </div>
      </div>

      <div v-if="view === 'DM'">
        <InitiativeList v-bind:refreshMillis='6000' @toggle-refresh='toggleRefresh'></InitiativeList>
        <hr/>
        <NewEntry></NewEntry>
        <div class='actions'>
          <b-button @click='clearRolls' class='is-danger'>Clear Initiative Rolls</b-button>
        </div>
      </div>

      <div v-if="view === 'PC'">
        <div v-if="playerName === ''">
          <NewPlayer v-on:playerReady="playerReady"></NewPlayer>
        </div>
        <div v-if="playerName !== ''">
          <InitiativeListPlayer v-bind:playerName="playerName" v-bind:refreshMillis='6000' @toggle-refresh='toggleRefresh'></InitiativeListPlayer>
        </div>
      </div>


    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NewEntry from "@/NewEntry.vue";
import NewPlayer from "@/NewPlayer.vue";
import InitiativeList from "@/InitiativeList.vue";
import InitiativeListPlayer from "@/InitiativeListPlayer.vue";

export default {
  name: "App",
  components: {
    NewEntry,
    NewPlayer,
    InitiativeList,
    InitiativeListPlayer
  },
  data() {
    return {
      view: "none",
      playerName: "",
      isRefreshing: false,
      passphrase: ""
    };
  },
  methods: {
    clearRolls() {
      // this.$buefy.notification.open("Clicked!!");
      this.$eventHub.$emit('clear-rolls')
    },
    enterDoor(role) {
      if (this.passphrase) {
        console.log ("entering the " + role + "'s view")
        this.view = role
      } else {
        console.log ("session code required")
      }
    },
    playerReady(name) {
      console.log("caught player-ready")
      this.playerName = name
    },
    toggleRefresh(e){
      this.isRefreshing = e
    }
  },
  computed: {
    refreshingType() {
      if (this.isRefreshing) return 'is-primary'
      else return 'is-light'
    },
    passphraseInputStyle() {
      if (this.passphrase) return ''
      else return 'is-danger'
    },
    passphraseInputMessage() {
      if (this.passphrase) return ''
      else return 'a session code is required'
    }
  },
  mounted: function() {
    var urlParams = new URLSearchParams(window.location.search);
    this.passphrase = urlParams.get('session')
  }
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

.headers {
  display: flex;
  margin-bottom: 24px;
}

.hright {
  margin-left: auto;
}

</style>