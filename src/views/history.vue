<template>
  <div>
    <v-container>
      <v-card>
    <v-card-title>
      History
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="history"
      :search="search"
    ></v-data-table>
  </v-card>
    </v-container>
   
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
// import ApexCharts from 'apexcharts'

export default {
  data() {
    return {
      search: '',
      history: [],
      chartday: [],
      headers: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "employee_name" },
        { text: "Amount", value: "amount" },
        { text: "Date Start", value: "date_start"},
        { text: "Date End", value: "date_end" },
        { text: "Status", value: "status", sortable: false },
      ],
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
        },
      ],
    };
  },
  async mounted() {
    let result = await axios.get("http://localhost:7000/gethistory");
    // console.log(result.data)
    this.history = result.data;
  },
};
</script>

<style>
</style>