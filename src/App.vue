<template>
  <div class="app" >
    <v-app >
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
};
</script>
<style>
#app {
  background-color: rgb(244, 246, 250);
}
* {
  font-family: "Prompt", sans-serif;
}
</style>