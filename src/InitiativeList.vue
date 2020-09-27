<template>
  <div class="container">

    <b-table
      :data="isEmpty ? [] : initList"
      :columns="columns"
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
    ></b-table>

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
  methods: {
    clickMe() {
      this.$buefy.notification.open("Clicked!!");
    },
    async refreshInitiativeList() {
      // with help from https://michaelnthiessen.com/this-is-undefined/
      await fetch("/api/initiatives")
        .then(async data => {
          var jsonBody = await data.json()
          this.initList = jsonBody.data;
          document.querySelector("#name").textContent = JSON.stringify(jsonBody);
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.refreshInitiativeList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>