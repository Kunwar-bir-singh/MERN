"use client";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import './globals.css'
import MainContent from "./components/mainContent/MainContent";

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
