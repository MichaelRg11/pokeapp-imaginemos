import React, { useState, useEffect } from "react";
import axios from "axios";

//context
import { useGlobalContext } from "../../../Context/GlobalProvider";

//interfaces
import {
  PokemonDetails,
  SideDrawerProps,
} from "../../../Interfaces/PokemonInterfaces";

//components
import PokemonCard from "../../components/cards/PokemonCard";

const SideDrawer: React.FC<SideDrawerProps> = ({ selectedPokemon }) => {
  const [locations, setLocations] = useState<PokemonDetails[]>([]);
  const { drawer } = useGlobalContext();

  //fetch locations
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        selectedPokemon.location_area_encounters
      );
      const locations = response.data;
      setLocations(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedPokemon, drawer]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">

        <div className="w-96 h-40">
          <PokemonCard
            image={
              selectedPokemon.sprites.other["official-artwork"].front_default
            }
            sprites={selectedPokemon.sprites}
            name={selectedPokemon.name}
            types={selectedPokemon.types}
            abilities={selectedPokemon.abilities}
            height={selectedPokemon.height}
            weight={selectedPokemon.weight}
            location_area_encounters={selectedPokemon.location_area_encounters}
            location_area={selectedPokemon.location_area}
          />
          <div className="w-full h-full maxw-96 flex flex-col overflow-x-auto">
            <h3 className="text-2xl font-bold my-4">Locations</h3>
            <ul className="text-lg font-bold whitespace-nowrap">
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <li key={index}>
                    <span className="font-normal">
                      {location.location_area.name}
                    </span>
                    {index < locations.length - 1 && <span>, </span>}
                  </li>
                ))
              ) : (
                <li>No tiene una localidad especifica</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
