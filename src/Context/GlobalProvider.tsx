import React, { createContext, useContext, useState } from "react";
import { ContextInter } from "../Context/Interfaces/ContextInter";

export const GlobalContext = createContext<ContextInter | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [pokemonName, setPokemonName] = useState<string>("pikachu");

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const setPokemon = (name: string) => {
    setPokemonName(name);
  };

  const value = {
    drawer: drawerOpen,
    pokemonName,
    setPokemon,
    openDrawer,
    closeDrawer,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

