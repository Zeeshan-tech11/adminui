import React from 'react'

function Pages(props) {
    let {pages,handleVisiblePage}=props;
    let pagesarray=[]
    for (let index = 0; index < pages; index++) {
        
        pagesarray.push(index)
    }
  return (
    
      <div className='page'>
        {pagesarray.map((value,idx)=>{
          return <button className='pages-btn' key={idx} value={value} onClick={(e)=>{handleVisiblePage(e)}}>{value}</button>
        })}
         
      </div>
    
  )
}

export default Pages