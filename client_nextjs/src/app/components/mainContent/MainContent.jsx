import React, { useState } from 'react'

const MainContent = () => {
    const [input, setInput] = useState({
        profession:"",
        city:""
    })

    const [city, setCity] = useState([])

    const getInput =(e)=>{
        const {name ,value} = e.target;
         
        setInput({
            ...input ,
            [name] : value
        })
    }

    
    const citiesData = async()=>{
        const api = await fetch('https://raw.githubusercontent.com/fayazara/Indian-Cities-API/master/cities.json');
        const data = await api.json();
        return data;
    }   
    const getSearch = ()=>{
        console.log(input);
        citiesData().then((data)=>{
            setCity(data.cities)
        //     city.map((item , index)=>{
        //     if(item.City.toLowerCase()== input.city.toLowerCase()){
        //         console.log("The City Is Found At Index : ",index);
        //     }
        //     else{
        //         console.log("No Such City Was Found");
        //     }
        // })
        }).catch((error)=>{
            console.log(error);
        })
        
    }
console.log(city);  
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