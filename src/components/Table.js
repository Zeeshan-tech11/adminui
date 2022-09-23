import React  from 'react'
import Home from './Home'
import { Component } from 'react'
import Btn from './Btn'
class Table extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         products:[],
         btn:0,
         initail:0,
         selectedId:[]
      }
    }
componentDidMount(){

    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(res=>res.json()).then((data=>{
        
        this.setState({
            ...this.state,
            products:data,
            btn:Math.ceil(data.length/10),
        })
    }))
}
handleInitialIndex=(e)=>{
   e.preventDefault();
   let v=e.target.value;
   this.setState({
    ...this.state,
    initail:v,
   })
}
handleDelete=(id)=>{
   let{products} =this.state
  let updated= products.filter((ele)=>ele.id!==id)
  this.setState({
    ...this.state,
    products:updated,
    btn:Math.ceil(updated.length/10),

  })
}
handleEdit=(id,name,email,role)=>{
  let {products}=this.state
  products.forEach(product=>{
    if(product.id===id){
      product.name=name
      product.email=email
      product.role=role
    }
  })
  this.setState(
    {
      ...this.state,
    }
  )
}
 deletteAll=(e)=>{
  let {selectedId}=this.state
  let updated=this.state.products
  selectedId.forEach((id)=>{
    updated=updated.filter((ele)=>ele.id!==id)
  })
  console.log(selectedId);
  selectedId=[]
  this.setState({
    ...this.state,
    products:updated,
    selectedId,
    btn:Math.ceil(updated.length/10),

  })
}
checkAll=(e)=>{
  let {selectedId,initail,products}=this.state
  console.log(e);
  let checkv=e.target.checked
  if(checkv){
      for(let i=initail*10;i<initail*10+10 && i<products.length;i++){
        selectedId.push(products[i].id)
      }
      
  }else{
    selectedId.splice(0)
  }
  this.setState({
    ...this.state,
    selectedId
  })
  console.log(selectedId);
}
render(){
 let {btn,products,initail,selectedId}=this.state
    return (
        <div>
            <table>
                <tr>
                    <td><input type="checkbox"  onChange={(e)=>this.checkAll(e)}></input></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Actions</td>
                </tr>
               {products.slice(initail*10,initail*10+10).map(product=>{ 
                 return <Home product={product} key={product.id}
                 handledel={this.handleDelete}
                 handleEdit={this.handleEdit}
                 selectedId={selectedId}
                 />
               })}
                
            </table>
          <button onClick={(e)=>this.deletteAll(e)}>Delete Selected</button>
           <Btn btn={btn} 
           setInitialIndex={this.handleInitialIndex}
            />   
        </div>
      )
}
  
}

export default Table