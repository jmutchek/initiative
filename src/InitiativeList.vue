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
      checkable
      :checked-rows.sync="checkedRows"
      :checkbox-position="checkboxPosition"
      default-sort="ModifiedRoll"
      default-sort-direction="desc"
      @check="checked"
    >
      <b-table-column
        field="ModifiedRoll"
        label="Initiative"
        width="130"
        numeric
        centered
        sortable
        v-slot="props"
      >
        {{ props.row.ModifiedRoll }}
      </b-table-column>

      <b-table-column field="RowKey" label="Name" v-slot="props">
        {{ props.row.RowKey }}
      </b-table-column>

      <b-table-column v-slot="props">
        <b-button
          type="is-text"
          icon-left="edit"
          size="is-small"
          class="has-text-grey-light"
          v-on:click="editCombatant(props.row)"
        >
        </b-button>
        <b-button
          type="is-text"
          icon-left="user-slash"
          size="is-small"
          class="has-text-grey-light"
          v-on:click="deleteCombatant(props.row)"
        >
        </b-button>
      </b-table-column>
    </b-table>
    <!-- <p>The API returned: <pre id="name">...</pre></p> -->
  </div>
</template>

<script>
export default {
  name: "InitiativeList",
  props: {
    refreshMillis: Number
  },
  data() {
    return {
      initList: [],
      checkboxPosition: "left",
      checkedRows: [],
      visibileRows: [],
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: false
    };
  },
  computed: {},
  methods: {
    async deleteCombatant(row) {
      var rowBeingDeleted = row;
      console.log("deleting " + rowBeingDeleted.RowKey + " from to list");

      // request options
      const options = {
        method: "DELETE",
        body: JSON.stringify(row),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // send POST request
      await fetch("/api/combatants", options)
        .then((res) => res.json())
        // .then()
        .catch((error) => {
          console.error(
            rowBeingDeleted.RowKey + " could not be deleted",
            error
          );
          this.$buefy.notification.open({
            message: rowBeingDeleted.RowKey + " could not be deleted",
            type: "is-danger",
          });
        });
      // .then((res) => console.log(res));

      this.$eventHub.$emit("reload-list");
      this.$buefy.notification.open("Deleted " + rowBeingDeleted.RowKey);
    },

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
          this.initList = jsonBody.data;
          this.checkedRows = []
          this.initList.forEach((combatant) => {
            if (combatant.visible) {
              this.checkedRows.push(combatant);
            }
          });
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
  
    clearInitiativeRolls() {
      this.initList.forEach(row => {
        this.updateCombatant(row, "ModifiedRoll", 0, false);
        this.refreshInitiativeList();
      });
    },

    startIntervalRefresh() {
      console.log("starting interval refresh")
      this.$emit('toggle-refresh', true)
      this.interval1 = setInterval(() => {
        this.refreshInitiativeList()
      }, this.refreshMillis)
    },

    stopIntervalRefresh() {
      console.log("stopping interval refresh")
      this.$emit('toggle-refresh', false)
      clearInterval(this.interval1)
      this.interval1 = null
    },

    checked(newChecked, checkedRow) {
      this.stopIntervalRefresh()

      if (checkedRow.visible) {
        this.updateCombatant(checkedRow, "visible", false);
      } else {
        this.updateCombatant(checkedRow, "visible", true);
      }

      this.startIntervalRefresh()
    }
},

  watch: {},
  created() {
    this.$eventHub.$on("reload-list", this.refreshInitiativeList);
    this.$eventHub.$on("clear-rolls", this.clearInitiativeRolls);
  },
  beforeDestroy() {
    this.$eventHub.$off("reload-list");
    this.$eventHub.$off("clear-rolls");
  },
  mounted() {
    this.refreshInitiativeList();
    this.startIntervalRefresh();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>