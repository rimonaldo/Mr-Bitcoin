import axios from 'axios'
import { httpService } from './http.service'
import { userService } from './user.service'
export const tokenService = {
   getRate,
   getMarketPrice,
   getPending,
   minePending,
   addTranaction,
   getBalanceByKey
}

// get market data --> cacheing mechanism
async function getMarketPrice() {
   try {
      let btcData
      const cacheBtcData = JSON.parse(sessionStorage.getItem('btc-data')) || null
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
      console.error(err)
      throw err
   }
}

async function addTranaction(amount, toAddress) {
   const { walletAddress, privateKey } = await userService.getUser()
   const balance = await getBalanceByKey(privateKey)
   if(amount > balance) return console.log('not enough coins');
   const tx = {
      fromAddress: walletAddress,
      toAddress: toAddress.walletAddress || 'address',
      amount: +amount,
      privateKey,
   }
   return await httpService.post('popCoin/transaction', tx)
}

async function getBalanceByKey(privateKey) {
   const balance = await httpService.get(`popCoin/wallet/${privateKey}`)
   const signupBonus = 1000
   return balance + signupBonus
}

async function minePending(rewardAddress) {
   console.log('minig through address: ', rewardAddress)
   try {
      const user = await userService.getUser()
      // const toUser = await userService.getById()
      const blocks = await httpService.post('miner/mine', rewardAddress)
      if (!blocks) return false
      user.moves.map(move => (move.status = 'approved'))
      await userService.updateUser(user)
      
      return blocks
   } catch (err) {
      console.error(err)
      throw err
   }
}

async function getRate() {
   try {
      const rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
      return rate.data
   } catch (err) {
      console.error(err)
      throw err
   }
}

async function getPending() {
   try {
      return await httpService.get('miner/pending')
   } catch (err) {
      console.error(err)
      throw err
   }
}
