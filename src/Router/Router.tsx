import React from "react";
//router
import { Routes, Route } from "react-router-dom";
//components
import Home from "../assets/components/Home";
import Charts from "../assets/components/pages/Charts";
import FilteredPoke from "../assets/components/pages/FilteredPoke";

//layout
import Header from "../assets/components/Layout/Header";
//context
import {GlobalProvider}  from "../Context/GlobalProvider";


const Router: React.FC = () => {
  return (
    <>
      <GlobalProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/filtered/:pokemonType" element={<FilteredPoke />} />
        </Routes>
      </GlobalProvider>
    </>
  );
};

export default Router;
