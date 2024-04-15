"use client";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContent = dynamic(
  () => import("./components/mainContent/MainContent"),
  { ssr: false }
);

const page = () => {
  return (
    <>
      <div>
        <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
        <MainContent />
      </div>
    </>
  );
};

export default page;
