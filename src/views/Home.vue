<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-row class="lightbox black--text pa-2" style="text-align:center;">
        <v-col>
          <div class="subheading">NON-PROJECT</div>
        </v-col>
      </v-row>
      <v-list dense>
        <v-list-item @click="$router.push({name: 'List'}).catch(()=>{})">
          <v-list-item-action>
            <v-icon color="blue">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'Equipment'}).catch(()=>{})">
          <v-list-item-action>
            <v-icon color="blue">mdi-hexagon-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Manage Stock</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'Employee'}).catch(()=>{})">
          <v-list-item-action>
            <v-icon color="blue">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Manage Employees</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'History'}).catch(()=>{})">
          <v-list-item-action>
            <v-icon color="blue">mdi-history</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" black>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>BorrowSystem</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{this.$store.state.user.name}}</v-toolbar-title>
      <v-btn @click="logout" class="ml-3" small color="red" dark outlined>Logout</v-btn>
    </v-app-bar>

    <v-main class="main">
      <v-container>
        <v-row align="center" justify="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  components: {},
  name: "home",
  data: () => ({
    drawer: null,
  }),
  mounted() {
    this.$store.state.user = JSON.parse(localStorage.getItem("active"));
    console.log(this.$store.state.user)
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$router.push({name: 'Login'})
    }
  },
};
</script>
<style>
.main {
  background-color: rgb(244, 246, 250);
}
* {
  font-family: "Prompt", sans-serif;
}
</style>