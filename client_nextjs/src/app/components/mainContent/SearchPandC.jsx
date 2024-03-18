import React from 'react'
const SearchPandC = ({input , displayData}) => {
    const search = async ()=>{

    }
  return (
    <>
    {input.city.length == 0 ? (
            <tr>
                <td>Enter City To Be Searched</td>
            </tr>
          ): (
          displayData.map((item , index)=>(
            <tr>
                <td>{item.City}</td>
            </tr>
          ))
          )}
    </>
  )
}

export default SearchPandC