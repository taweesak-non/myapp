<template>
  <div id="list">
    <v-container>
      <div class="card">
        <v-row>
          <v-col v-for="item in equipment" :key="item.id" lg="4">
            <v-card class="pa-2">
              <div style="text-align:center;">
                <img :src="item.image" width="100px;" height="100px" />
              </div>
              <v-card-title>{{item.name}}</v-card-title>
              <v-card-text>
                <div>{{item.description}}</div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn color="blue" text @click="showdialog(item.id, item.stock)">Borrow</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Borrow Details</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="7">
                  <v-text-field v-model="amount" suffix="Pcs." placeholder="Amount"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="selectday" row>
                    <v-radio label="7 Days" value="7"></v-radio>
                    <v-radio label="15 Days" value="15"></v-radio>
                    <v-radio label="30 Days" value="30"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" color="normal">Cancel</v-btn>
            <v-btn @click="borrow(); update();" color="success">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <h2>{{getTime()}}</h2>
      <h2>{{addTime()}}</h2>-->
      <!-- <h2>{{datestart}}</h2>
      <h2>{{dateend}}</h2>-->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "list",
  data() {
    return {
      dialog: false,
      id: "",
      stock: "",
      equipment: [],
      selectday: "",
      amount: "",
      resultamout: "",
    };
  },
  async mounted() {
    let result = await axios.get("http://localhost:7000/getproduct");
    this.equipment = result.data;
  },
  methods: {
    //  getTime() {
    //   return moment().format('YYYY-MM-DD');
    // },
    // addTime() {
    //   return moment().add(this.selectday,'days').format('YYYY-MM-DD')
    // },
    showdialog(id, stock) {
      //  console.log(stock)
      this.stock = stock;
      this.id = id;
      this.dialog = true;
    },

    borrow() {
      this.dialog = false;
      axios.post("http://localhost:7000/borrow", {
        equipment_id: this.id,
        employee_id: this.$store.state.user.user_id,
        employee_name: this.$store.state.user.name,
        amount: this.amount,
        date_start: moment().format("YYYY-MM-DD"),
        date_end: moment().add(this.selectday, "days").format("YYYY-MM-DD"),
      });
    },
    update() {
      this.resultamout = this.stock - this.amount;
      axios.put("http://localhost:7000/updateamount", {
        id: this.id,
        stock: this.resultamout,
      });
    },
  },
};
</script>

<style>
</style>