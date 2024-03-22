import React, { useEffect, useState } from "react";
import Link from "next/link";
const MainContent = () => {
    const [res, setRes] = useState(null);

  const search = async () => {
    try {
      let queryString = `name=${input.name
        .toLowerCase()
        .trim()}&city=${input.city.toLowerCase().trim()}`;
      const api = await fetch(
        `http://localhost:3001/api/authProfession/getProfession?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await api.json();
      setRes(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [res]);

  const [input, setInput] = useState({
    name: "",
    city: "",
  });

  const getInput = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <>
      <div>
        <input
          className="p-1 m-1 border-2 border-slate-950	 text-lg"
          type="text"
          name="name"
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
        <button
          onClick={search}
          className="p-2 m-4 bg-pink-800 text-lg text-white rounded-lg "
        >
          Search
        </button>
      </div>
        <table>
        <tbody>
          {res == null ? (
            "Enter The Profession To Be Searched."
          ) : res.hasOwnProperty("name") ? (
              <tr>
              <td>

                {/* <Link href={`/routes/profession/${res.name}`}> */}
                <Link href={`/routes/profession/${res.name}`}>
                {res.name}
                </Link>
                </td>
              <td>{res.city}</td>
            </tr>
          ) : (
            <tr>
              <td>{res.msg}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default MainContent;
