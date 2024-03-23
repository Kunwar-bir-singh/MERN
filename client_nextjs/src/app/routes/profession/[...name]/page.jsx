"use client"
import React from 'react'

const page = ({params}) => {
  const name = params.name[0];
  const city = params.name[1];
  console.log(name , city);
  return (
    <div>page</div>
  )
}

export default page