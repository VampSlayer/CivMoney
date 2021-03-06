<template>
  <div id="dashboard-chart"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { mapState } from "vuex";
import graphing from "../services/graphing";
import dateFormatter from '../services/dateFormatter';

export default {
  name: "MonthBar",
  props: {
    data: Array
  },
  mounted() {
    this.draw();
  },
  watch: {
    "me.currency": function() {
      this.draw();
    },
    data: function() {
      this.draw();
    }
  },
  computed: {
    ...mapState(["me", "theme", "selectedYear", "selectedMonth"])
  },
  methods: {
    draw() {
      if (!this.data || this.data.length === 0) return;
      this.$router.push({name: "home", hash: `#${this.selectedYear}/${this.selectedMonth}`});
      graphing.useTheme(am4core);

      let chart = am4core.create("dashboard-chart", am4charts.XYChart);
      chart.data = this.data;

      let dateAxis = graphing.createDateAxis(chart, "date", "DD");
        dateAxis.renderer.labels.template.events.on(
          "hit",
          event => {
            this.drawDateModal(
             dateFormatter.format(event.target.dataItem.dates.date, "YYYY-MM-DD")
            );
          },
          this
        );

      let valueAxis = graphing.createValueAxis(chart, this.me.currency);

      let series = graphing.createSeries(
        chart,
        "date",
        this.me.currency,
        this.theme
      );
        series.columns.template.events.on(
          "hit",
          event => {
            this.drawDateModal(event.target.dataItem.dataContext.date);
          },
          this
        );

      graphing.createSeriesRange(valueAxis, series);

      graphing.createTrendLine(chart, this.data, this.me.currency, this.theme);
    },
    drawDateModal(date) {
      if (!date) return;
      this.$emit("draw-date-modal", date);
    }
  }
};
</script>