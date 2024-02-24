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
      className="w-full hfull p-3 rounded-lg flex flex-col justify-center items-center hover:cursor-pointer hover:shadow-lg "
      style={backgroundStyle}
    >
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
    </motion.div>
  );
};

export default PokemonCard;
