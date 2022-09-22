import React, { useState } from 'react'

function Home(props) {
    let {product,handledel}=props
    let[edit,setEdit]=useState(true)
    let [name,setName]=useState(product.name)
    let [email,setEmail]=useState(product.email)
    let [role,setRole]=useState(product.role)
  return (
            <tr>
            <td><input type="checkbox" value={product.id}  ></input></td>
            {edit?<td>{name}</td>:<input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>}
            {edit?<td>{email}</td>:<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>}
            {edit?<td>{role}</td>:<input type="text" value={role} onChange={(e)=>setRole(e.target.value)}></input>}
            <td><button onClick={()=>setEdit(!edit)}>{!edit?'Submit':'Edit'}</button> <button onClick={()=>handledel(product.id)}>delete</button></td>
            </tr>
  )
}

export default Home