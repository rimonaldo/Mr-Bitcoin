import axios from 'axios'
import { httpService } from './http.service'
import { userService } from './userService'
export const bitcoinService = {
   getRate,
   getMarketPrice,
   getPending,
   minePending,
}

async function getRate() {
   try {
      const rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
      return rate.data
   } catch (err) {
      console.log(err)
      throw err
   }
}

async function getPending() {
   return await httpService.get('miner/pending')
}

async function minePending(rewardAddress) {
   console.log('minig')
   const user = await userService.getUser()
   const blocks = await httpService.post('miner/mine', rewardAddress)
   if (!blocks) return false
   user.moves.map(move => (move.status = 'approved'))
   await userService.updateUser(user)
   return blocks
}

// market data --> cacheing mechanism
async function getMarketPrice() {
   try {
      const cacheBtcData = JSON.parse(sessionStorage.getItem('btc-data')) || null
      let btcData
      const nextPull = JSON.parse(localStorage.getItem('last-btc-db-pull')) + 1000 * 60 * 60
      const lastPull = Date.now()
      if (lastPull > nextPull || !cacheBtcData) {
         console.log('time to pull')
         btcData = await axios.get(
            `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true#`
         )
         sessionStorage.setItem('btc-data', JSON.stringify(btcData.data.values))
         localStorage.setItem('last-btc-db-pull', JSON.stringify(lastPull))
      } else {
         console.log('next pull in', (nextPull - lastPull) / 1000 / 60, 'm')
         btcData = cacheBtcData
      }
      if (!btcData.length) btcData = btcData.data.values
      return btcData
   } catch (err) {
      console.log(err)
      throw err
   }
}

async function cacheAsyncData(apiAddress, storageDataName, pullingMinutes) {
   try {
      const cachedData = JSON.parse(sessionStorage.getItem(storageDataName)) || null
      let data
      const nextPull = JSON.parse(localStorage.getItem('last-btc-db-pull')) + 1000 * 60 * +pullingMinutes
      const lastPull = Date.now()
      if (lastPull > nextPull || !cachedData) {
         console.log('time to pull')
         data = await axios.get(apiAddress)
         sessionStorage.setItem('btc-data', JSON.stringify(data.data.values))
         localStorage.setItem('last-btc-db-pull', JSON.stringify(lastPull))
      } else {
         console.log('next pull in', (nextPull - lastPull) / 1000 / pullingMinutes, 'm')
         data = cachedData
      }
      if (!data.length) data = data.data.values
      return data
   } catch (err) {
      console.log('could not cache data',err)
      throw err
   }
}



