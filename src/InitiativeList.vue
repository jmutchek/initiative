<template>
  <div class="container">
    <p>Loading content from the API: <b id="name">...</b></p>

    <b-table
      :data="isEmpty ? [] : data"
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
  </div>
</template>

<script>
export default {
  name: "InitiativeList",
  data() {
    const data = [
      { initiative: 20, name: "Lux" },
      { initiative: 18, name: "Aya" },
    ];
    const columns = [
      {
        field: "initiative",
        label: "Modified Roll",
        width: 130,
        numeric: true,
      },
      {
        field: "name",
        label: "Name",
      },
    ];
    return {
      data,
      columns,
      checkboxPosition: "left",
      checkedRows: [data[1]],
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
  },
};

(async function () {
  let { text } = await (await fetch('/api/initiatives')).json();
  document.querySelector("#name").textContent = text;
})();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>