import React from "react";
import { userService } from "../services/userService";
import { bitcoinService } from "../services/bitcoinService";
import { BarChart } from "../cmps/LineChart.jsx";
export class HomePage extends React.Component {
  state = {
    user: {},
    rate: "",
    chartData: {
      labels: [1, 2, 3, 4],
      datasets: [
        {
          label: "user gain",
          data: [500, 100],
        },
      ],
    },
  };

  async componentDidMount() {
    const user = await userService.getUser();
    const chartData = await this.getMarketData();
    const rate =
      chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
    this.setState({ rate, user, chartData });
  }

  componentWillUnmount() {}
  getRate(price) {}

  async getMarketData() {
    let currDay;
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Daily price",
          data: [],
          fill: true,
          backgroundColor: "#ffa50038",
          borderColor: "#ffa50050",
        },
      ],
    };

    const rawDb = await bitcoinService.getMarketPrice();
    rawDb.forEach((day) => {
      currDay = new Date(day.x * 1000);
      currDay = currDay.getMonth()+1 + "." + currDay.getDate();
      chartData.labels.push(currDay);
      chartData.datasets[0].data.push(day.y/1000);
    });
    return chartData;
  }

  setChartDate(){

  }

  render() {
    const { user, chartData, rate } = this.state;
    if (!chartData) return <div>Loading...</div>;
    return (
      <section className="home container">
        <header>Hi,{user.name}</header>
        <div className="balance-container">
          <div className="balance">
            <header>CURRENT BALANCE</header>
            <div className="btc">
              BTC: <div className="fa-b"></div>
              {user.coins}
            </div>
            <span>USD: ${(user.coins * rate).toLocaleString()}</span>
          </div>
        </div>
        {chartData ? <BarChart chartData={chartData} /> : ""}
        <header>CURRENT BTC USD</header>
        <div className="btc-usd">$7000</div>
        <div className="moves"></div>
      </section>
    );
  }
}
