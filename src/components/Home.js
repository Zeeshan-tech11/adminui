import React, { useState } from 'react'

function Home(props) {
    let {product,handledel,handleEdit,selectedId}=props
    let[edit,setEdit]=useState(true)
    let [name,setName]=useState(product.name)
    let [email,setEmail]=useState(product.email)
    let [role,setRole]=useState(product.role)
    let [check,setCheck]=useState(props.check)
    const checkV=(selectedId)=>{
       selectedId.includes(product.id)?check=true:check=false
    }
    checkV(selectedId)
    const setSubmit=(edit)=>{
      setEdit(!edit)
      if(!edit){
         handleEdit(product.id,name,email,role)
      }
    }
    const setChecked=(v,id)=>{
      if(v===true){
        selectedId.push(id)
      }else{
        let index=selectedId.indexOf(product.id)
        selectedId.splice(index,1)
      }
      setCheck(v)
      console.log(selectedId);
    }
  return (
            <tr>
            <td><input type="checkbox" value={product.id}onChange={()=>setChecked(!check,product.id)} onClick={()=>setChecked(!check,product.id)} checked={check} ></input></td>
            {edit?<td>{name}</td>:<input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>}
            {edit?<td>{email}</td>:<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>}
            {edit?<td>{role}</td>:<input type="text" value={role} onChange={(e)=>setRole(e.target.value)}></input>}
            <td><button onClick={()=>setSubmit(edit)}>{!edit?'Submit':'Edit'}</button> <button onClick={()=>handledel(product.id)}>delete</button></td>
            </tr>
  )
}

export default Home