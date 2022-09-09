import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userService } from '../services/userService'
export const Moves = props => {
   const { amount, rate } = props

   function getMovesToDisplay() {
      return amount ? props.moves.slice(0, amount) : props.moves
   }

   const formateTime = time => {
      const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      const date = new Date(time)
      const moveDate = ` ${monthNames[date.getMonth()]} ${date.getDate()} , ${date.getFullYear()}`
      const mins = date.getMinutes() + ''
      const moveMins = mins.length < 2 ? '0' + date.getMinutes() : date.getMinutes()
      const hour = ` ${date.getHours()}:${moveMins}`
      return `${moveDate} | ${hour}`
   }

   if (!props.moves.length)
      return (
         <div className="container moves">
            <span className="no">No moves to display</span>
         </div>
      )

   return (
      <section className="container moves">
         <header className="main full">
            <span className="fa-s"></span> {amount ? `Last ${amount} moves ` : 'Moves history'}
         </header>

         {getMovesToDisplay().map(move => {
            const recived = move.to.name === JSON.parse(sessionStorage.getItem('loggedUser')).username
            return (
               <div key={move.at} className="move">
                  <div>
                     <span className={recived ? 'from' : 'to'}> {recived ? 'FROM' : 'TO'} </span>
                     <Link to={`/contact/${move.to._id}`}>{recived ? move.from.username : move.to.name}</Link>
                  </div>

                  <div className="amount">
                     <span className="coins">
                        <span className="fa-b"></span>
                        {move.amount}
                     </span>
                     <span className="coins">{'$' + (move.amount * rate).toFixed(2)}</span>
                  </div>

                  <div className="status-box">
                     <span>STATUS : </span>
                     <span className={move.status || 'approved'}>
                        {move.status ? move.status.toUpperCase() : 'APPROVED'}
                     </span>
                  </div>
                  <div className="at">{formateTime(move.at)}</div>
               </div>
            )
         })}
      </section>
   )
}
