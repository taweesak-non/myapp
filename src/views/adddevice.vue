<template>
  <div id="adddeivce">
    <v-container>
      <h2>Add Device</h2>
      <v-card id="center" class="mt-8" flat height="350px" style="position:relative;">
        <v-row>
          <v-col cols="4" style="text-align:center">
            <!-- <img v-if="image == null" src="@/equipment_img/1.jpg" width="200" height="200" /> -->
            <v-img :src="image" width="200" height="200"></v-img>
            <input  @change="uploadImage" type="file" accept="image/*" />
          </v-col>
          <v-col class="ml-10" cols="7">
            <v-text-field label="Device Name" v-model="name" single-line solo></v-text-field>
            <v-text-field label="Description" v-model="description" single-line solo></v-text-field>
            <v-text-field label="Stock" v-model="stock" single-line solo></v-text-field>
            <v-btn
              @click="$router.push({name: 'Equipment'})"
              style="margin-right:120px"
              absolute
              bottom
              right
              color="normal"
            >Cancel</v-btn>
            <v-btn @click="add" absolute bottom right color="success">Confirm</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// import { Base64 } from "js-base64";

export default {
  name: "adddevice",
  data() {
    return {
      image: "",
      name: "",
      description: "",
      stock: "",
    };
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
      console.log(this.image);
    },
    uploadImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        this.image = reader.result;
        console.log(file);
      };
      reader.readAsDataURL(file);
    },
    add() {
      this.$router.push({name: 'Equipment'})
      axios
        .post("http://localhost:7000/add", {
          name: this.name,
          description: this.description,
          stock: this.stock,
          image: this.image,
        })
        .then((response) => {
          this.message = response.data;
        });
    },
  },
};
</script>
<style scoped>
#center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>