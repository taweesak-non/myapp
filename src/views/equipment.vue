<template>
  <div id="equipment">
    <v-container>
      <div class="ontop">
        <v-row>
          <v-col cols="8">
            <h2>Equipment</h2>
          </v-col>
       
          <v-col cols="4" style="text-align:right;">
            <v-btn depressed color="success" @click="$router.push({name: 'Adddevice'})">ADD DEVICE +</v-btn>
          </v-col>
        </v-row>
      </div>
      <div>
      </div>
      <div class="headertable" style="margin-top:20px; text-align:center;color:DarkGrey;">
        <v-row>
          <v-col cols="2">
            <h3>ID</h3>
          </v-col>
          <v-col cols="2">
            <h3>Image</h3>
          </v-col>
          <v-col cols="3">
            <h3>Name</h3>
          </v-col>
          <v-col cols="2">
            <h3>Stock</h3>
          </v-col>
          <v-col cols="3">
            <h3>Action</h3>
          </v-col>
        </v-row>
      </div>
      <div
        style="text-align:center; margin-bottom:10px;"
        v-for="(item, index) in equipment"
        :key="item.id"
      >
        <v-card flat>
          <v-row>
            <v-col class="center" cols="2">{{item.id}}</v-col>
            <v-col cols="2">
              <img :src="item.image" width="50px;" height="50px" />
            </v-col>
            <v-col class="center" cols="3">{{item.name}}</v-col>
            <v-col class="center" cols="2">{{item.stock}}</v-col>
            <v-col class="center" cols="3">
              <v-btn @click="editItem(item.id, item.name , item.stock)" depressed class="mx-3" color="success">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteItem(index , item.id)" depressed dark color="warning">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Edit Equipment</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="edit.name" label="name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="edit.stock" label="stock"></v-text-field>
                  </v-col>
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
  name: "equipment",
  components: {},
  data() {
    return {
      equipment: [],
      dialog: false,
      edit: {
        id: '',
        name: '',
        stock: '',
      },
    };
  },
  
computed: {
}, 

  async mounted() {
    let result = await axios.get("http://localhost:7000/getproduct");
    this.equipment = result.data;
  },
  methods: {
    deleteItem(index, id) {
      console.log(id);
      axios.delete("http://localhost:7000/deleteeq", { data: { id } });
      this.equipment.splice(index, 1);
    },
  editItem(id ,name , stock) {
    //  console.log(id)
    this.edit.id = id,
    this.edit.name = name,
    this.edit.stock = stock
    this.dialog = true
  },
  save() {
    axios.put("http://localhost:7000/update", { 
      id : this.edit.id,
      name: this.edit.name,
      stock: this.edit.stock
    });
    this.dialog = false
    // console.log(this.edit.id)
    // console.log(this.edit.name)
    // console.log(this.edit.stock)
  },
  }
};
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>