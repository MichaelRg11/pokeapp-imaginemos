import React, { useState, useEffect } from "react";
import axios from "axios";
//cards
import PokemonCard from "./cards/PokemonCard";

//motion framer
import { motion } from "framer-motion";

//interfaces
import {
  PokemonDetails,
  PokemonListResponse,
} from "../../Interfaces/PokemonInterfaces";

//import mainContext
import { useGlobalContext } from "../../Context/GlobalProvider";
import SideDrawer from "./Layout/SideDrawer";

const Home: React.FC = () => {
  const { drawer, closeDrawer, pokemonName } = useGlobalContext();
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string>(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
  );
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails>();

  const [pokemonType, setPokemonType] = useState<string>("all");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    if (pokemonType === "all") {
      console.log(nextUrl);
      setPokemons([]);
      loadAllPokemons();
    } else {
      loadPokemonsFiltered();
    }
  }, [pokemonType]);

  useEffect(() => {
    if (pokemonType === "all") {
    window.addEventListener("scroll", handleScroll);
  }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    fetchPokemon();
  }, [pokemonName]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    if (pokemonType !== "all") {
      loadPokemonsFiltered();
    }else{
      loadAllPokemons();
    }
  };

  const fetchPokemon = async () => {
    try {
      const response = await axios.get<PokemonDetails>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Error fetching pokemon:", error);
    }
  };

  const loadAllPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PokemonListResponse>(nextUrl);
      setNextUrl(response.data.next);
      const newPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonRecord = await axios.get<PokemonDetails>(pokemon.url);
          return pokemonRecord.data;
        })
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPokemonsFiltered = async () => {
    setLoading(true);
    setNextUrl(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`);
    try {
      const response = await axios.get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/type/${pokemonType}`
      );
      const newPokemons = await Promise.all(
        response.data.pokemon.map(async (pokemon) => {
          const pokemonRecord = await axios.get<PokemonDetails>(
            pokemon.pokemon.url
          );
          return pokemonRecord.data;
        })
      );
      setPokemons(newPokemons);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full min-h-screen h-fit flex justify-center bg-anti-flash-white">
        <div className="max-w-screen-xl w-full h-full bg-anti-flash-white px-5">
          <div className="w-full py-5 flex justify-end">
            {/* select */}

            <select
              className="w-44 h-10 border-2 border-space-cadet rounded-md"
              onChange={handleTypeChange}
            >
              {/* 18 pokemons types */}
              <option
                value="all"
                onClick={() => {
                  setPokemons([]);
                }}
              >
                All
              </option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
            </select>
          </div>
          {/* cards */}

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {pokemons.length > 0 ? (
              pokemons.map((pokemon: any, index: number) => (
                <PokemonCard
                  key={index}
                  image={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png"
                  }
                  sprites={pokemon.sprites.other["official-artwork"].front_default}
                  name={pokemon.name}
                  types={pokemon.types}
                  abilities={pokemon.abilities}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  location_area_encounters={pokemon.location_area_encounters}
                  location_area={pokemon.location_area}
                  loading={loading}
                />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <h2 className="text-3xl font-bold">No pokemons found</h2>
              </div>
            )}
          </div>
        </div>

        {/* loading */}
        {/* <motion.div
          animate={{ y: loading ? 0 : "100%" }}
          transition={{ duration: 0.3 }} // Ajusta la duración según si está cargando o no
          className={`w-full fixed bottom-0 left-0 flex justify-center items-center py-7 bg-red-pantone ${
            loading ? "" : "hidden"
          }`}
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </motion.div> */}

        {/* left Side drawer */}
        <motion.div
          animate={{ x: drawer ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
          className={`max-w-screen-md w-full h-full fixed top-0 left-0 bg-white z-50 shadow-lg ${
            drawer ? "" : "hidden"
          }`}
        >
          <div className="w-full h-full flex flex-col justify-end items-start relative">
            <div className="absolute top-0 right-0">
              <button
                onClick={() => closeDrawer()}
                className="w-10 h-10 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full h-full flex justify-center items-center">
              {selectedPokemon ? (
                <SideDrawer selectedPokemon={selectedPokemon} />
              ) : (
                <p>No pokemon selected</p>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
