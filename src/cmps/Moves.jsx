import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { tokenService } from '../services/token.service'
import { useEffect } from 'react'
import { loadPending} from '../store/actions/tokenActions'
export const Moves = props => {
   const dispatch = useDispatch()
   const { pending, blocks } = useSelector(state => state.tokenModule)
   const [blocksPage, setBlocksPage] = useState(2)
   useEffect(() => {
      dispatch(loadPending())
   }, [blocks])

   const { amount, rate } = props

   function getMovesToDisplay() {
      console.log(props.moves)
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


   
   const setStatus = (move) => {
      pending.forEach(penTx => {
         // console.log(move._id );
         // console.log(penTx._id );
         return move._id === penTx._id
      })

      try {
        console.log(pending);
         return move.status ? move.status.toUpperCase() : 'APPROVED'
      } catch (error) {
         
      }
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
            const recived = move.to.username === JSON.parse(sessionStorage.getItem('loggedUser')).username
            const description = move.description

            return (

               
               <div key={move.at} className="move">
                  
                  <div>
                     <span className={recived ? 'from' : 'to'}> {recived ? 'FROM' : 'TO'} </span>
                     <Link to={`/contact/${recived ? move.from._id : move.to._id}`}>
                        {recived ? move.from.username : move.to.username}
                     </Link>
                  </div>

                  <div className="amount">
                     <span className="coins">
                        <span className="fa-b"></span>
                        {move.amount}
                     </span>
                     <span className="coins">{'$' + (move.amount * rate).toFixed(2)}</span>
                  </div>

                  <div className="status-box">
                     <span>STATUS </span>
                     <span className={move.status || 'approved'}>
                        {setStatus(move)}
                     </span>
                  </div>

                  {description ? (
                     <div className="description">
                        {' '}
                        <span>INFO</span> <span>{description}</span>{' '}
                     </div>
                  ) : (
                     ''
                  )}

                  <div className="at">{formateTime(move.at)}</div>
               </div>
            )
         })}
      </section>
   )
}
