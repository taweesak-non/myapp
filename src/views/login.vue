<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat>
           <h2 class="pa-5" style="text-align:center;">Sign in</h2>
          <v-card-text>
              <v-text-field
                label="E-mail"
                v-model="email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                filled
                rounded
                dense
                single-line
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                v-model="password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                filled
                rounded
                dense
                single-line
              ></v-text-field>
          </v-card-text>

          <div style="color: red; text-align:center; padding-bottom:20px">{{message}}</div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click="$router.push({name: 'Register'})" color="red" dark outlined>Register</v-btn>
            <v-btn @click="login" color="blue" dark outlined>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: false,
      email: "",
      password: "",
      message: "",
    };
  },
mounted() {
  this.$store.state.user = JSON.parse(localStorage.getItem('active'))
},

  methods: {
    login() {
      axios
        .post("http://localhost:7000/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
             this.$router.push({name: 'List'})
            localStorage.setItem("active", JSON.stringify(response.data[0]));
             this.$store.state.user = JSON.parse(localStorage.getItem('active'))
            //  console.log(this.$store.state.user)
          } else {
            this.message = "รหัสผ่านไม่ถูกต้อง";
          }
        });
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>