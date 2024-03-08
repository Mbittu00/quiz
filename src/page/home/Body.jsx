import React from 'react'
import "./body.css"
import { useNavigate } from 'react-router-dom'
export const Body = ({data}) => {
    let location=useNavigate()
    let move=()=>{
        location(`/create/${data._id}`)
    }
    return (
    <div className='body' onClick={move}>
        <img src={data.img} alt="image" />
       <span className="title">{data.type}</span>
       <span className="dec">{data.dec}</span>
    </div>
  )
}
