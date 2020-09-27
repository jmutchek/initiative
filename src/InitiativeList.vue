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
      },
      {
        field: "RowKey",
        label: "Name",
      },
    ];
    return {
      initList: [{ RowKey: "Hi", ModifiedRoll: 18 }],
      columns,
      checkboxPosition: "left",
      // checkedRows: [this.data[1]],
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
    refreshInitiativeList() {
      (async function () {
        let { data } = await (await fetch("/api/initiatives")).json();
        document.querySelector("#name").textContent = JSON.stringify(data);
        this.initList = data;
      })();
    },
  },
  mounted() {
    this.refreshInitiativeList()
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>