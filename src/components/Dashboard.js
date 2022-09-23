import React  from 'react'
import UserDetails from './UserDetails'
import { Component } from 'react'
import Pages from './Pages'
class Dashboard extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         Users:[],
         pages:0,
         page:0,
         selectedIds:[],
         checkAllUsers:-1,
         checkedTop:false
      }
    }
componentDidMount(){

    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(res=>res.json()).then((data=>{
        
        this.setState({
            ...this.state,
            Users:data,
            pages:Math.ceil(data.length/10),
        })
    }))
}
handleVisiblePage=(e)=>{
  let {checkAllUsers,checkedTop}=this.state
  
   let visiblePage=e.target.value;
   if(checkAllUsers!==visiblePage){
    checkedTop=false
  }else{
    checkedTop=true
  }
   this.setState({
    ...this.state,
    page:visiblePage,
    checkedTop
   })
}
handleDelete=(id)=>{
   let{Users} =this.state
  let updated= Users.filter((ele)=>ele.id!==id)
  this.setState({
    ...this.state,
    Users:updated,
    pages:Math.ceil(updated.length/10),

  })
}
handleEdit=(id,name,email,role)=>{
  let {Users}=this.state
  Users.forEach(user=>{
    if(user.id===id){
      user.name=name
      user.email=email
      user.role=role
    }
  })
  this.setState(
    {
      ...this.state,
    }
  )
}
 deleteAll=(e)=>{
  let {selectedIds,checkedTop}=this.state
  let updated=this.state.Users
  selectedIds.forEach((id)=>{
    updated=updated.filter((ele)=>ele.id!==id)
  })
  console.log(selectedIds);
  selectedIds=[]
  this.setState({
    ...this.state,
    Users:updated,
    selectedIds,
    checkedTop:!checkedTop,
    pages:Math.ceil(updated.length/10),

  })
}
checkAllUsers=(e)=>{
  let {selectedIds,page,Users,checkedTop,checkAllUsers}=this.state
  let checkv=e.target.checked
  checkedTop=checkv
  if(checkv){
      for(let i=page*10;i<page*10+10 && i<Users.length;i++){
        selectedIds.push(Users[i].id)
      }
      checkAllUsers=page 
  }else{
    selectedIds.splice(0)
    checkAllUsers=-1
  }
  this.setState({
    ...this.state,
    selectedIds,
    checkedTop,
    checkAllUsers
  })
}
render(){
 let {pages,Users,page,selectedIds,checkedTop}=this.state
    return (
        <div>
            <table>
                <tr>
                    <td><input type="checkbox"  onChange={(e)=>this.checkAllUsers(e)} checked={checkedTop}></input></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Actions</td>
                </tr>
               {Users.slice(page*10,page*10+10).map(user=>{ 
                 return <UserDetails user={user} key={user.id}
                 handledel={this.handleDelete}
                 handleEdit={this.handleEdit}
                 selectedIds={selectedIds}
                 />
               })}
                
            </table>
          <button onClick={(e)=>this.deleteAll(e)}>Delete Selected</button>
           <Pages pages={pages} 
           handleVisiblePage={this.handleVisiblePage}
            />   
        </div>
      )
}
  
}

export default Dashboard