<template>
  <div id="employee">
    <v-container>
      <div class="ontop">
        <v-row>
          <v-col cols="12">
            <h2>Employee List</h2>
          </v-col>
        </v-row>
      </div>
      <div></div>
      <div class="headertable" style="margin-top:20px; text-align:center;color:DarkGrey;">
        <v-row>
          <v-col cols="2">
            <h3>ID</h3>
          </v-col>
          <v-col cols="3">
            <h3>Name</h3>
          </v-col>
          <v-col cols="2">
            <h3>E-Mail</h3>
          </v-col>
          <v-col cols="2">
            <h3>Role</h3>
          </v-col>
          <v-col cols="3">
            <h3>Action</h3>
          </v-col>
        </v-row>
      </div>
      <div
        style="text-align:center; margin-bottom:10px;"
        v-for="(item, index) in user"
        :key="item.id"
      >
        <v-card flat>
          <v-row>
            <v-col class="center" cols="2">{{item.user_id}}</v-col>
            <v-col class="center" cols="3">{{item.name}}</v-col>
            <v-col class="center" cols="2">{{item.email}}</v-col>
            <v-col class="center" cols="2">{{item.role}}</v-col>
            <v-col class="center" cols="3">
              <v-btn
                @click="editItem(item.user_id, item.name , item.email , item.role)"
                depressed
                class="mx-3"
                color="success"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteItem(index , item.user_id)" depressed dark color="warning">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Edit User</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="edit.name" label="name"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="edit.email" label="E-mail"></v-text-field>
                </v-col>
                <!-- <v-col v-model="role" class="d-flex" cols="6">
                  <v-select :items="items" label="Select Role" dense outlined></v-select>
                </v-col>-->
                {{role}}
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" color="normal">Cancel</v-btn>
            <v-btn @click="save" color="success">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "employee",
  components: {},
  data() {
    return {
      // items: ['Admin' , 'Employee'],
      user: [],
      dialog: false,
      role: "",
      edit: {
        id: "",
        name: "",
        password: "",
        email: "",
      },
    };
  },

  computed: {
  
  },

  async mounted() {
    let result = await axios.get("http://localhost:7000/getuser");
    this.user = result.data;
  },
  methods: {
    deleteItem(index, user_id) {
        console.log(user_id)
      axios.delete("http://localhost:7000/deleteem", { data: { user_id } });
      this.user.splice(index, 1);
    },
    editItem(user_id, name, email) {
      //  console.log(id)
      (this.edit.id = user_id),
        (this.edit.name = name),
        (this.edit.email = email),
        (this.dialog = true);
    },
    save() {
      axios.put("http://localhost:7000/updateem", {
        id: this.edit.id,
        name: this.edit.name,
        email: this.edit.email
      });
      this.dialog = false;
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