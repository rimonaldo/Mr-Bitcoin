import React from 'react'
import { Link } from 'react-router-dom'
export function ContactPreview({ contact }) {
   return (
      <Link to={`/contact/${contact._id}`} className="contact">
         <div className="avatar"></div>
         <div className="info">
            <span className="name">{contact.name || contact.username || contact.nickname}</span>
            <span className="phone">{contact.phone}</span>
            {/* <span className="phone">{contact.email}</span> */}
         </div>
      </Link>
   )
}
