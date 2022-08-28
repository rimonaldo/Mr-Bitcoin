import { useState } from 'react'
import { useDispatch, useSelector, useRef } from 'react-redux'
import { Link } from 'react-router-dom'
import { Component, createRef } from 'react'
import { UserMsg } from './UserMsg'
export const PrivateKey = props => {
   const { loggedUser } = useSelector(state => state.userModule)
   const [isShown, setIsShown] = useState(false)

   //    if (!isShown) return
   function handleChange({ target }) {}

   const inputRef = createRef()
   function ref() {
      inputRef.current.select()
   }

   return (
      <>
         <div className="key-box">
            <input ref={inputRef} className="key" onChange={handleChange} type="text" value={loggedUser.privateKey} />
            <div className="copy fa-s" onClick={ref}></div>
         </div>

         <div className="wallet-box">
            <input ref={inputRef} className="key" onChange={handleChange} type="text" value={loggedUser.privateKey} />
            <div className="copy fa-s" onClick={ref}></div>
         </div>
      </>
   )
}
