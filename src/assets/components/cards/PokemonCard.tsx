//interface
import { PokemonDetails } from "../../../Interfaces/PokemonInterfaces";

//import mainContext
import { useGlobalContext } from "../../../Context/GlobalProvider";

//framer motion
import { motion } from "framer-motion";

const PokemonCard: React.FC<PokemonDetails> = ({
  image,
  name,
  types,
  abilities,
  weight,
  height,
  loading,
}) => {
  const { openDrawer, setPokemon } = useGlobalContext();
  const getColorByType = (type: string) => {
    switch (type) {
      case "normal":
        return "#DEB887"; // bg-normal
      case "fire":
        return "#FFA500"; // bg-fire
      case "water":
        return "#ADD8E6"; // bg-water
      case "electric":
        return "#FFFF00"; // bg-electric
      case "grass":
        return "#90EE90"; // bg-grass
      case "ice":
        return "#ADD8E6"; // bg-ice
      case "fighting":
        return "#FF0000"; // bg-fighting
      case "poison":
        return "#800080"; // bg-poison
      case "ground":
        return "#A52A2A"; // bg-ground
      case "flying":
        return "#87CEEB"; // bg-flying
      case "psychic":
        return "#FFC0CB"; // bg-psychic
      case "bug":
        return "#90EE90"; // bg-bug
      case "rock":
        return "#A9A9A9"; // bg-rock
      case "ghost":
        return "#000000"; // bg-ghost
      case "dragon":
        return "#FF8C00"; // bg-dragon
      case "dark":
        return "#000000"; // bg-dark
      case "steel":
        return "#D3D3D3"; // bg-steel
      case "fairy":
        return "#FFC0CB"; // bg-fairy
      default:
        return "#808080"; // bg-gray-500 (valor predeterminado)
    }
  };

  const getPokemonBackgroundStyle = (types: any[]) => {
    if (types.length === 1) {
      return `var(--${types[0].type.name})`;
    } else {
      const colors = types.map((type) => `var(--${type.type.name})`);
      return `linear-gradient(to bottom, ${colors.join(", ")})`;
    }
  };

  // Obtener el estilo de fondo del Pokémon
  const backgroundStyle = {
    background: getPokemonBackgroundStyle(types),
  };

  return (
    <motion.div
      onClick={() => {
        setPokemon(name);
        openDrawer();
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      whileTap={{ scale: 0.9 }}
      className="w-full h-40 p-3 rounded-lg flex flex-col justify-center items-center hover:cursor-pointer hover:shadow-lg "
      style={backgroundStyle}
    >
      {loading ? (
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
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <div className="w-3/5">
              <h3 className="text-xl font-bold my-1 ">{name}</h3>
              <ul className="text-sm ml-1">
                <li>
                  <span className="font-bold">Height: </span> {height}
                </li>
                <li>
                  <span className="font-bold">Weight: </span> {weight}
                </li>
                <li className="w-40 text-nowrap overflow-hidden text-ellipsis">
                  <span className="mr-1 font-bold">Abilities:</span>
                  {abilities.map((ability, index) => (
                    <span key={index}>
                      {index > 0 && ", "} {ability.ability.name}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
            <div className="w-2/5 ">
              <img src={image} alt={name} className="w-full object-contain" />
            </div>
          </div>

          <div>
            <ul className="flex">
              {types.map((type, index) => (
                <li
                  className="p-1 px-2 mr-2 rounded-md min-w-10 w-20 max-w-fit text-xs text-center font-bold shadow-sm"
                  style={{
                    backgroundColor: getColorByType(type.type.name),
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
        </div>
      )}
    </motion.div>
  );
};

export default PokemonCard;
