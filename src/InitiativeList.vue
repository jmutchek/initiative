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
    >
      <b-table-column field='ModifiedRoll' label='Modified Roll' width='130' numeric sortable v-slot='props'>
        {{ props.row.ModifiedRoll}}
      </b-table-column>

      <b-table-column field='RowKey' label='Name' v-slot='props'>
        {{ props.row.RowKey}}
      </b-table-column>

      <b-table-column v-slot='props'>
        <b-button
          type="is-text"
          icon-left='trash-can-outline'
          size='is-small'
          class='has-text-grey-light'
          v-on:click="deleteCombatant(props.row)"
          >
        </b-button>
      </b-table-column>

    </b-table>

    <p>The API returned: <pre id="name">...</pre></p>
  </div>
</template>

<script>
export default {
  name: "InitiativeList",
  data() {
    const columns = [
      {
        field: "ModifiedRoll",
        label: "Modified Roll",
        width: 130,
        numeric: true,
        sortable: true,
      },
      {
        field: "RowKey",
        label: "Name",
      },
    ];
    return {
      initList: [],
      columns,
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
      hasMobileCards: false,
    };
  },
  computed: {
  },
  methods: {
    async deleteCombatant(row) {
      var rowBeingDeleted = row
      console.log("deleting " + rowBeingDeleted.RowKey + " from to list")

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
        .catch(error => {
          console.error(rowBeingDeleted.RowKey + ' could not be deleted', error)
          this.$buefy.notification.open({
            message: rowBeingDeleted.RowKey + ' could not be deleted',
            type: 'is-danger'
          });
        })
        // .then((res) => console.log(res));
      
      this.$eventHub.$emit('reload-list')
      this.$buefy.notification.open("Deleted " + rowBeingDeleted.RowKey);
    },
    async refreshInitiativeList() {
      // with help from https://michaelnthiessen.com/this-is-undefined/
      console.log('refreshing list')
      await fetch("/api/initiatives")
        .then(async (data) => {
          var jsonBody = await data.json();
          this.initList = jsonBody.data;
          this.initList.forEach(combatant => {
          if (combatant.visible) {
            this.checkedRows.push(combatant)
          }
        })
          document.querySelector("#name").textContent = JSON.stringify(
            jsonBody
          );
        })
        .catch((err) => console.error(err));
    },
  },
  watch: {
    checkedRows: function (newChecked, oldChecked) {
      oldChecked.forEach((row) => {
        var oldRowRemains = newChecked.filter(function (entry) {
          return entry.RowKey === row.RowKey;
        });
        if (oldRowRemains.length == 0) {
          revealCombatant(row, false);
        }
      });
      newChecked.forEach((row) => {
        var newRow = oldChecked.filter(function (entry) {
          return entry.RowKey === row.RowKey;
        });
        if (newRow.length == 0) {
          revealCombatant(row, true);
        }
      });
    },
  },
  created() {
    this.$eventHub.$on('reload-list', this.refreshInitiativeList)
  },
  beforeDestroy() {
    this.$eventHub.$off('reload-list');
  },
  mounted() {
    this.refreshInitiativeList();
  }
};

function revealCombatant(combatant, visibility) {
  combatant.visible = visibility;
  console.log("setting " + combatant.RowKey + "'s visibility to " + visibility);

  // request options
  const options = {
    method: "PUT",
    body: JSON.stringify(combatant),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send PUT request
  fetch("/api/combatants", options)
    .then((res) => res.json())
    // .then((res) => console.log(res));
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>