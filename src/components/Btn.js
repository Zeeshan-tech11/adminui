import React from 'react'

function Btn(props) {
    let {btn,setInitialIndex}=props;
    let btnarray=[]
    for (let index = 0; index < btn; index++) {
        
        btnarray.push(index)
    }
  return (
    <div>
      <div>
        {btnarray.map((value,idx)=>{
          return <button key={idx} value={value} onClick={(e)=>{setInitialIndex(e)}}>{value}</button>
        })}
         
      </div>
    </div>
  )
}

export default Btn