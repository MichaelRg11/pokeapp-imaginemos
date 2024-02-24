export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
    pokemon: {
      pokemon: {
        name: string;
        url: string;
      };
    }[];
}

export interface pokemonType {
  pokemon: any[];
  name: string;
  url: string;
}

export interface PokemonDetails {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  }
  image: string;
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  location_area: {
    name: string;
  }
  height: number;
  weight: number;
  location_area_encounters: string;
}

export interface SideDrawerProps {
  selectedPokemon: PokemonDetails; // Definir la prop selectedPokemon y su tipo
}