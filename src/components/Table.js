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
        //  slicedata:[]
      }
    }
componentDidMount(){
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(res=>res.json()).then((data=>{
        // let slicedata=data.slice(0,10)
        this.setState({
            ...this.state,
            products:data,
            btn:Math.ceil(data.length/10),
            // slicedata
        })
    }))
}
handleInitialIndex=(e)=>{
   e.preventDefault();
   let {products}=this.state
   let v=e.target.value;
   let slicedata=products.slice(v*10,v*10+10)
   this.setState({
    ...this.state,
    initail:v,
    slicedata
   })
}
handleDelete=(id)=>{
   let{products} =this.state
  let updated= products.filter((ele)=>ele.id!==id)
  this.setState({
    ...this.state,
    products:updated
  })
}
handleEdit=(id)=>{

}
checkAll=(e)=>{
  e.preventDefault()
  if(e.target.checked){
     let {initail,products}=this.state
    //  for(let i=initail;i<initail+10;i++){
    //       pro
    //  }
  }else{
    return
  }
}
render(){
 let {btn,products,initail}=this.state
//  console.log(this.state);
    return (
        <div>
            <table>
                <tr>
                    <td><input type="checkbox"  onChange={(e)=>this.checkAll(e)} ></input></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Actions</td>
                </tr>
               {products.slice(initail*10,initail*10+10).map(product=>{  
                 return <Home product={product} key={product.id}
                 handledel={this.handleDelete}
                 handleEdit={this.handleEdit}
                 />
               })}
                
            </table>
            
           <Btn btn={btn} 
           setInitialIndex={this.handleInitialIndex}
            />   
        </div>
      )
}
  
}

export default Table