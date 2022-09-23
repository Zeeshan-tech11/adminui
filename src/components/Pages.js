import React from 'react'

function Pages(props) {
    let {pages,handleVisiblePage}=props;
    let pagesarray=[]
    for (let index = 0; index < pages; index++) {
        
        pagesarray.push(index)
    }
  return (
    <div>
      <div>
        {pagesarray.map((value,idx)=>{
          return <button key={idx} value={value} onClick={(e)=>{handleVisiblePage(e)}}>{value}</button>
        })}
         
      </div>
    </div>
  )
}

export default Pages