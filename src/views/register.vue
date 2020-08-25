<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat>
          <h2 class="pa-5" style="text-align:center;">Register</h2>

          <v-card-text>
            <v-text-field
              label="Full Name"
              v-model="fullname"
              name="name"
              prepend-icon="mdi-account"
              type="text"
              filled
              rounded
              dense
              single-line
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model="email"
              name="email"
              prepend-icon="mdi-mail"
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="register" color="red" dark outlined>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:7000/register", {
          fullname: this.fullname,
          password: this.password,
          email: this.email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            this.$router.push({ name: "Login" });
          } else {
            this.message = "เกิดข้อผิดพลาด";
          }
        });
    },
  },
};
</script>