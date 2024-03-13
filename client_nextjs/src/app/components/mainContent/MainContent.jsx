import React, { useState } from 'react'

const MainContent = () => {
    const [input, setInput] = useState({
        profession:"",
        city:""
    })
    const getInput =(e)=>{
        const {name ,value} = e.target;
         
        setInput({
            ...input ,
            [name] : value
        })
    }

    const getSearch = ()=>{
        console.log(input);
    }
  return (
    <>
    <div>
        <input className='p-1 m-1 border-2 border-slate-950	 text-lg' type="text" name="profession" onChange={getInput} value={input.profession} id="" />
        <input className='p-1 m-1 border-2 border-slate-950	 text-lg' type="text" name="city" onChange={getInput} value={input.city} id="" />
        <button onClick={getSearch} >Search</button>
    </div>
    
    </>

  )
}

export default MainContent