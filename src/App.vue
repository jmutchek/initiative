<template>
  <div>
    <h1>Hello {{ value }}</h1>
    <NewEntry></NewEntry>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value: "World",
    };
  },
};
</script>
