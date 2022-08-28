import React, { Component } from 'react'
import { useState } from 'react'

export const UserMsg = props => {

   return (
      <div className="user-msg">
         <div className="msg">{props.msg}</div>
      </div>
   )
}
