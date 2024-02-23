import React, { useState, useEffect } from "react";
import axios from "axios";

//context
import { useGlobalContext } from "../../../Context/GlobalProvider";

const SideDrawer: React.FC = ({ selectedPokemon }) => {
  const [locations, setLocations] = useState<string[]>([]);

  const { drawer } = useGlobalContext();

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
      <div className="flex flex-col items-center h-full">
        <img
          src={selectedPokemon.sprites.other["official-artwork"].front_default}
          alt={selectedPokemon.name}
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mb-4"
        />

        <h2 className="text-4xl font-bold mb-2 w-full">
          {selectedPokemon.name}
        </h2>

        <ul className="text-lg font-bold w-full">
          <li>
            <span className="font-bold">Height: </span>
            <span className="font-normal">{selectedPokemon.height}</span>
          </li>
          <li>
            <span className="font-bold">Weight: </span>
            <span className="font-normal">{selectedPokemon.weight}</span>
          </li>
          <li>
            <span className="font-bold mr-1">Abilities:</span>
            {selectedPokemon.abilities.map((ability, index) => (
              <span className="font-normal" key={index}>
                {index > 0 && ", "}
                {ability.ability.name}
              </span>
            ))}
          </li>
        </ul>

        <div className="w-full flex flex-col justify-start items-start">
          <h3 className="text-2xl font-bold my-4">Types</h3>
          <ul className="flex">
            {selectedPokemon.types.map((type, index) => (
              <li
                className="p-1 px-2 mr-2 rounded-md min-w-10 w-20 max-w-fit text-xs text-center font-bold shadow-sm"
                style={{
                  backgroundColor: `var(--${type.type.name})`,
                }}
                key={index}
              >
                <span className="mix-blend-normal text-white">
                  {type.type.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

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
    </>
  );
};

export default SideDrawer;
