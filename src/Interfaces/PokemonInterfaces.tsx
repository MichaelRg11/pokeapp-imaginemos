export interface PokemonListResponse {
  pokemon: Array<pokemonType>;
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface pokemonType {
  pokemon: any[];
  name: string;
  url: string;
}

export interface PokemonDetails {
  sprites: { front_default: string };
  image: string;
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}
