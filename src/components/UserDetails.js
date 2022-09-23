import React, { useState } from 'react'

function UserDetails(props) {
    let {user,handledel,handleEdit,selectedIds}=props
    let[edit,setEdit]=useState(true)
    let [name,setName]=useState(user.name)
    let [email,setEmail]=useState(user.email)
    let [role,setRole]=useState(user.role)
    let [check,setCheck]=useState(props.check)
    const checkV=(selectedIds)=>{
       selectedIds.includes(user.id)?check=true:check=false
    }
    checkV(selectedIds)
    const setSubmit=(edit)=>{
      setEdit(!edit)
      if(!edit){
         handleEdit(user.id,name,email,role)
      }
    }
    const setChecked=(v,id)=>{
      if(v===true){
        selectedIds.push(id)
      }else{
        let index=selectedIds.indexOf(user.id)
        selectedIds.splice(index,1)
      }
      setCheck(v)
      console.log(selectedIds);
    }
  return (
            <tr>
            <td><input type="checkbox" value={user.id}onChange={()=>setChecked(!check,user.id)} onClick={()=>setChecked(!check,user.id)} checked={check} ></input></td>
            {edit?<td>{name}</td>:<td><input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input></td>}
            {edit?<td>{email}</td>:<td><input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input></td>}
            {edit?<td>{role}</td>:<td><input type="text" value={role} onChange={(e)=>setRole(e.target.value)}></input></td>}
            <td><button onClick={()=>setSubmit(edit)}>{!edit?'Submit':'Edit'}</button> <button className='delete-btn' onClick={()=>handledel(user.id)}>delete</button></td>
            </tr>
  )
}

export default UserDetails