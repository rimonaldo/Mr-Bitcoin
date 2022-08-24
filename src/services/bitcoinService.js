import axios from "axios";

export const bitcoinService = {
  getRate,
  getMarketPrice,
};

async function getRate() {
  try {
    const rate = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=1`
    );
    return rate.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// market data --> cacheing mechanism
async function getMarketPrice() {
  try {
    const cacheBtcData = JSON.parse(sessionStorage.getItem("btc-data")) || null;
    let btcData;
    const nextPull =
      JSON.parse(localStorage.getItem("last-btc-db-pull")) + 1000 * 60 * 60;
    const lastPull = Date.now();
    if (lastPull > nextPull || !cacheBtcData) {
      // console.log("time to pull");
      btcData = await axios.get(
        `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true#`
      );
      sessionStorage.setItem("btc-data", JSON.stringify(btcData.data.values));
      localStorage.setItem("last-btc-db-pull", JSON.stringify(lastPull));
    } else {
      // console.log("next pull in", (nextPull - lastPull) / 1000 / 60, "m");
      btcData = cacheBtcData;
    }
    if (!btcData.length) btcData = btcData.data.values;
    return btcData;
  } catch (err) {
    console.log(err);
    throw err;
  }
}






