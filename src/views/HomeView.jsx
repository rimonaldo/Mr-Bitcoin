import React from 'react'
import { userService } from '../services/user.service'
import { tokenService } from '../services/token.service'
import { BarChart } from '../cmps/LineChart.jsx'
import { Moves } from '../cmps/Moves'
import { setRate } from '../store/actions/tokenActions'
import { setBalance } from '../store/actions/userActions'
import { connect } from 'react-redux'

export class _AppPage extends React.Component {
   render() {
      const { user, chartData, rate } = this.state
      const { balance } = this.props
      if (!chartData) return <div>Loading...</div>
      return (
         <section>
            <section className="home container">
               <div className="balance-container">
                  <header>Hi, {user.username}</header>
                  <div className="chart-container">
                     <div className="balance">
                        <div className="b-header">CURRENT BALANCE</div>
                        <div className="current">
                           POP{' '}
                           <div>
                              <div className="fa-b"></div>
                              <span>{balance}</span>
                           </div>
                        </div>

                        <span>USD ${(user.coins * rate).toFixed(2).toLocaleString()}</span>
                     </div>

                     <div className="rate-container">
                        <div className="b-header">CURRENT PRICE PER COIN</div>
                        <div className="rate">${rate.toLocaleString()}</div>
                     </div>
                  </div>
                  {chartData ? <BarChart chartData={chartData} /> : ''}
               </div>
               {user.moves ? <Moves moves={user.moves} amount={5} rate={rate} /> : ''}
            </section>
         </section>
      )
   }

   state = {
      user: {},
      rate: '',
      chartData: {
         labels: [1, 2, 3, 4],
         datasets: [
            {
               label: 'user gain',
               data: [500, 100],
            },
         ],
      },
   }

   async componentDidMount() {
      const user = await userService.getUser()
      const chartData = await this.getMarketData()
      const lastDay = chartData.datasets[0].data.length - 1
      const rate = chartData.datasets[0].data[lastDay]
      this.props.setRate(rate)
      this.props.setBalance(user.privateKey)

      this.setState({ rate, user, chartData })
   }

   async getMarketData() {
      const chartData = {
         labels: [],
         datasets: [
            {
               label: 'Daily price',
               data: [],
               fill: true,
               backgroundColor: '#ffa50038',
               borderColor: '#ffa50050',
            },
         ],
      }
      const rawDb = await tokenService.getMarketPrice()
      return this.formatChartData(rawDb, chartData)
   }

   formatChartData(rawDb, chartData) {
      let currDay
      rawDb.forEach(day => {
         currDay = new Date(day.x * 1000)
         currDay = currDay.getMonth() + 1 + '.' + currDay.getDate()
         chartData.labels.push(currDay)
         chartData.datasets[0].data.push(this.formatCoins(day.y))
      })
      return chartData
   }

   formatCoins(price) {
      return price / 1000
   }

   componentWillUnmount() {}

   setBalance({ privateKey }) {}
}

// REDUX CONFIGORATION
const mapStateToProps = state => {
   return {
      user: state.userModule.loggedUser,
      balance: state.userModule.balance,
      contacts: state.contactModule.contacts,
   }
}

const mapDispatchToProps = { setRate, setBalance }

export const AppPage = connect(mapStateToProps, mapDispatchToProps)(_AppPage)
