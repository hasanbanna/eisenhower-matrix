<template>
  <canvas id="matrix" width="400" height="400"></canvas>
</template>
<script>
import Chart from "chart.js/auto";
import dragDataPlugin from "chartjs-plugin-dragdata";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(dragDataPlugin);
Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
Chart.defaults.font.size = 16;

export default {
  props: {
    chartData: {
      type: Object,
    },
  },
  chart: null,
  watch: {
    chartData(newData) {
      this.$options.chart.data.datasets = newData.datasets;
      this.$options.chart.data.labels = newData.labels;
      this.$options.chart.update("none");
    },
  },
  mounted() {
    const context = this;
    const ctx = document.getElementById("matrix").getContext("2d");
    this.$options.chart = new Chart(ctx, {
      type: "scatter",
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      },
      options: {
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              label(context) {
                return context.chart.data.labels[context.dataIndex];
              },
            },
          },
          datalabels: {
            formatter(value, context) {
              const text = context.chart.data.labels[context.dataIndex];
              if (text.length > 20) {
                return `${text.slice(0, 20)}...`;
              }
              return text;
            },
            textAlign: "center",
            align: "right",
            padding: {
              left: 15,
            },
          },
          annotation: {
            annotations: {
              topLeftBox: {
                drawTime: "beforeDraw",
                type: "box",
                xMin: 0,
                xMax: 0.5,
                yMin: 0.5,
                yMax: 1,
                backgroundColor: "rgba(255, 0, 0, 0.25)",
              },
              topRightBox: {
                drawTime: "beforeDraw",
                type: "box",
                xMin: 0.5,
                xMax: 1,
                yMin: 0.5,
                yMax: 1,
                backgroundColor: "rgba(0, 255, 0, 0.25)",
              },
              bottomLeftBox: {
                drawTime: "beforeDraw",
                type: "box",
                xMin: 0,
                xMax: 0.5,
                yMin: 0,
                yMax: 0.5,
                backgroundColor: "rgba(0, 0, 255, 0.25)",
              },
              bottomRightBox: {
                drawTime: "beforeDraw",
                type: "box",
                xMin: 0.5,
                xMax: 1,
                yMin: 0,
                yMax: 0.5,
                backgroundColor: "rgba(255,255, 0, 0.25)",
              },
            },
          },
          title: {
            display: true,
            text: "Importance/urgency matrix",
          },
          legend: {
            display: false,
          },
          dragData: {
            dragX: true,
            showTooltip: false,
            onDrag: function (e) {
              if (e.target.style) {
                e.target.style.cursor = "grabbing";
              }
            },
            onDragEnd: function (e, datasetIndex, index, value) {
              e.target.style.cursor = "default";
              context.$emit("data-value-change", {
                datasetIndex,
                index,
                value,
              });
            },
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            min: 0,
            max: 1,
            title: {
              text: "Urgency ➜",
              display: true,
            },
          },
          y: {
            ticks: {
              display: false,
            },
            min: 0,
            max: 1,
            title: {
              text: "Importance ➜",
              display: true,
            },
          },
        },
      },
    });
  },
};
</script>
