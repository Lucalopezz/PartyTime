import React from 'react'

const Input = ({text, type, placeholder, handleOnChange, value, name}) => {
  return (
   <label>
    <span>{text}</span>
    <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange} value={value} required/>
   </label>
  )
}

export default Input
