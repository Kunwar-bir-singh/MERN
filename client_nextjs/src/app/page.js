"use client";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import './globals.css'
import dynamic from 'next/dynamic'
const MainContent = dynamic(() => import('./components/mainContent/MainContent'), { ssr: false })
const page = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Navbar/>
          <MainContent/>
        </div>
      </div>
    </>
  );
};

export default page;
