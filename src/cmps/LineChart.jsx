import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);
export class BarChart extends React.Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
        },
      ],
    },

    options: {
      responsive: true,
      elements: {
        point: {
          radius: 1.5,
          color:'black'
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "xy",
          },
          zoom: {
            limits: {
              y: {min: 'original', max: 'original'},
              y2: {min: 'original', max:'original'}
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
        },
      },
    },
  };

  componentDidMount() {
    this.setState({ chartData: this.props.chartData });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chartData !== this.props.chartData) {
      this.setState({ chartData: this.props.chartData });
    }
  }

  demoCharData = {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        label: "user gain",
        data: [41133.08, 40946.78, 41795.77],
      },
    ],
  };

  render() {
    const { chartData, options, legend } = this.state;
    return (
      <section>
        <Line data={chartData} options={options} />
      </section>
    );
  }
}
