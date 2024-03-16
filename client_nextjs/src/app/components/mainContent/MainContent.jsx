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

    const citiesData = async()=>{
        const api = await fetch('https://raw.githubusercontent.com/fayazara/Indian-Cities-API/master/cities.json');
        const data = await api.json();
        return data;
    }   
    citiesData().then((data)=>{
        const city= data.cities[0];
        console.log(city);
    }).catch((error)=>{
        console.log(error);
    })
  return (
    <>
    <div>
        <input className='p-1 m-1 border-2 border-slate-950	 text-lg' type="text" name="profession" onChange={getInput} value={input.profession} id="" />
        <input className='p-1 m-1 border-2 border-slate-950	 text-lg' type="text" name="city" onChange={getInput} value={input.city} id="" />
        <button className='p-2 m-4 bg-pink-800 text-lg text-white rounded-lg ' onClick={getSearch} >Search</button>
    </div>
    <table>
        <tbody>

        <tr>
            <th>City</th>
            <th>State</th>
        </tr>
        </tbody>
    </table>
    </>

  )
}

export default MainContent