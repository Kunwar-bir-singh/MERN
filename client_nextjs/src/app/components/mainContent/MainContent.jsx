import React, { useEffect, useState } from "react";
import SearchPandC from "./SearchPandC";
const MainContent = () => {
  const [res, setRes] = useState([]);
  const citiesData = async () => {
    const api = await fetch(
      "https://raw.githubusercontent.com/fayazara/Indian-Cities-API/master/cities.json"
    );
    const data = await api.json();
    setRes(data.cities);
  };

  const [input, setInput] = useState({
    profession: "",
    city: "",
  });

  const getInput = (e) => {
    const { name, value } = e.target;
    
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    citiesData();
  }, []);

  const [displayData , setDisplayData] = useState([]);

  const search = ()=>{
    const foundCity = res.filter((item , index)=>(
        item.City.toLowerCase().includes(input.city.toLowerCase())
    ))
    console.log(foundCity);
    setDisplayData(foundCity);
  }

  return (
    <>
      <div>
        <input
          className="p-1 m-1 border-2 border-slate-950	 text-lg"
          type="text"
          name="profession"
          onChange={getInput}
          value={input.profession}
          id=""
        />
        <input
          className="p-1 m-1 border-2 border-slate-950	 text-lg"
          type="text"
          name="city"
          onChange={getInput}
          value={input.city}
          id=""
        />
        <button onClick={search} className="p-2 m-4 bg-pink-800 text-lg text-white rounded-lg " >
          Search
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>City</th>
            <th>State</th>  
          </tr>
            <SearchPandC input={input} displayData = {displayData}  />
        </tbody>
      </table>

    </>
  );
};

export default MainContent;
