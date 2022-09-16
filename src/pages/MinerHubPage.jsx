import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPending, minePending } from '../store/actions/tokenActions'
import { useState } from 'react'

export const MinerHub = props => {
   const dispatch = useDispatch()
   const { pending, blocks } = useSelector(state => state.tokenModule)
   const [blocksPage, setBlocksPage] = useState(2)
   useEffect(() => {
      dispatch(loadPending())
   }, [blocks])

   useEffect(() => {
      showBlocks()
   }, [blocksPage])

   function pageBlocks() {
      let pages = blocks % 10
   }
   function onSetPage(ev) {
      const page = ev.target.name
      setBlocksPage(page)
   }

   function showBlocks() {
      // let pagesCount = Math.floor(blocks.length / 10) + 1
      // let pages = []
      // for (let i = 1; i <= pagesCount; i++) {
      //    let page = i
      //    pages.push(i)
      // }
      // let paging = blocksPage * 10
      // let startPageIdx = 0 + paging
      // let endPageIdx = startPageIdx + 10
      return blocks.length ? (
         <>
            {blocks.map((block, index) => {
               return (
                  <li key={block.hash} className="block" onChange={ev => ev.stopPropagation()}>
                     <span className="index">
                        index : <span>{index}</span>
                     </span>
                     <div>
                        prev hash:{' '}
                        <input onChange={ev => ev.stopPropagation()} type="text" value={block.previousHash} />
                     </div>
                     <div>
                        timestamp: <input onChange={ev => ev.stopPropagation()} type="text" value={block.timestamp} />
                     </div>
                     <div>
                        nonce: <input onChange={ev => ev.stopPropagation()} type="text" value={block.nonce} />
                     </div>
                     <div>
                        trans:{' '}
                        <input
                           onChange={ev => ev.stopPropagation()}
                           type="text"
                           value={JSON.stringify(block.transactions)}
                        />
                     </div>
                     <div>
                        hash: <input onChange={ev => ev.stopPropagation()} type="text" value={block.hash} />
                     </div>
                  </li>
               )
            })}
         </>
      ) : (
         ''
      )
   }

   function showPending() {
      return pending.length ? (
         <>
            {pending.map(tx => {
               return (
                  <li key={tx._id} className="pending">
                     <span>
                        signature: <input onChange={ev => ev.stopPropagation()} type="text" value={tx.signature} />
                     </span>
                  </li>
               )
            })}
         </>
      ) : (
         ''
      )
   }

   function onMine() {
      dispatch(minePending())
   }

   return (
      <section className="container miner-hub">
         <form className="pending-container">
            <label>
               <header>
                  PENDING : <span>{pending.length}</span>
               </header>
               <ul className="pendings">{showPending()}</ul>
            </label>

            <footer>
               <button onClick={() => onMine()}>mine</button>
               <header>
                  BLOCKS : <span>{blocks.length}</span>
               </header>
               <ul className="blocks">{showBlocks()}</ul>
            </footer>
         </form>
      </section>
   )
}
