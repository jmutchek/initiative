<template>
  <div class="container">
    <b-table
      :data="isEmpty ? [] : initList"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      default-sort="ModifiedRoll"
      default-sort-direction="desc"
    >
      <b-table-column
        field="ModifiedRoll"
        label="Initiative"
        width="130"
        numeric
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.ModifiedRoll }}
      </b-table-column>

      <b-table-column field="RowKey" label="Name" v-slot="props">
        {{ props.row.RowKey }}
      </b-table-column>
    </b-table>
    <!-- <p>The API returned: <pre id="name">...</pre></p> -->
    <div class="actions">
      <b-button @click="editCombatant(currentPlayer)" class="">
        Update Initiative roll for {{ this.playerName }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitiativeListPlayer",
  props: {
    playerName: String
  },
  data() {
    return {
      initList: [],
      visibileRows: [],
      currentPlayer: {},
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: false,
    };
  },
  computed: {},
  methods: {
    async editCombatant(row) {
      await this.$buefy.dialog.prompt({
        message: row.RowKey + `'s New Initiative`,
        inputAttrs: {
          type: "number",
          placeholder: "modified initiative (roll + modifiers)",
          value: row.ModifiedRoll,
          maxlength: 2,
          min: -10,
        },
        confirmText: "Save",
        trapFocus: true,
        // onConfirm: (value) => this.$buefy.toast.open(`New initiative is: ${value}`)
        onConfirm: (value) => {
          this.updateCombatant(row, "ModifiedRoll", value, true);
        },
      });
    },

    async refreshInitiativeList() {
      // with help from https://michaelnthiessen.com/this-is-undefined/
      console.log("refreshing list");
      await fetch("/api/initiatives")
        .then(async (data) => {
          var jsonBody = await data.json();
          var newList = [];
          jsonBody.data.forEach((combatant) => {
            if (combatant.visible) {
              if (combatant.RowKey === this.playerName) {
                this.currentPlayer = combatant
              }
              newList.push(combatant);
            }
          });
          this.initList = newList;
          // document.querySelector("#name").textContent = JSON.stringify(
          //   jsonBody
          // );
        })
        .catch((err) => console.error(err));
    },

    async updateCombatant(combatant, property, value, refresh) {
      combatant[property] = value;
      console.log(
        "setting " + combatant.RowKey + "'s " + property + " to " + value
      );

      // request options
      const options = {
        method: "PUT",
        body: JSON.stringify(combatant),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // send PUT request
      await fetch("/api/combatants", options).then((res) => res.json());
      if (refresh) {
        this.refreshInitiativeList();
      }
      // .then((res) => console.log(res));
    },
  },

  created() {
    this.$eventHub.$on("reload-list", this.refreshInitiativeList);
  },
  beforeDestroy() {
    this.$eventHub.$off("reload-list");
  },
  mounted() {
    this.refreshInitiativeList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.actions {
  margin-top: 24px;
}

</style>