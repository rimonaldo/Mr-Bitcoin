import React from "react";
import { userService } from "../services/userService";
import { bitcoinService } from "../services/bitcoinService";
import { BarChart } from "../cmps/LineChart.jsx";
import { Moves } from "../cmps/Moves";
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
    return this.formatChartData(rawDb, chartData);
  }

  formatChartData(rawDb, chartData) {
    let currDay;
    rawDb.forEach((day) => {
      currDay = new Date(day.x * 1000);
      currDay = currDay.getMonth() + 1 + "." + currDay.getDate();
      chartData.labels.push(currDay);
      chartData.datasets[0].data.push(this.formatCoins(day.y));
    });
    return chartData;
  }

  formatCoins(price) {
    return price / 1000;
  }

  setChartDate() {}

  render() {
    const { user, chartData, rate } = this.state;
    if (!chartData) return <div>Loading...</div>;
    return (
      <section>
        <section className="home container">
          <header>Hi, {user.name}</header>
          <div className="balance-container">
            <div className="balance">
              <div className="b-header">CURRENT BALANCE</div>
              <div className="btc">
                BTC:{" "}
                <div>
                  <div className="fa-b"></div>
                  <span>{user.coins}</span>
                </div>
              </div>
              <span>
                USD: ${(user.coins * rate).toFixed(2).toLocaleString()}
              </span>
            </div>

            <div className="rate-container">
              <div className="b-header">CURRENT PRICE PER COIN</div>
              <div className="rate">${rate.toLocaleString()}</div>
            </div>
          </div>
          {chartData ? <BarChart chartData={chartData} /> : ""}
        </section>
        <Moves amount={5} rate={rate} />
      </section>
    );
  }
}
