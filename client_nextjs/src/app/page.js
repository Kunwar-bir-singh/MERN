"use client";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";


const MainContent = dynamic(
  () => import("./components/mainContent/MainContent"),
  { ssr: false }
);

const page = () => {
  return (
    <ChakraProvider>
        <MainContent />
    </ChakraProvider>
  );
};

export default page;
