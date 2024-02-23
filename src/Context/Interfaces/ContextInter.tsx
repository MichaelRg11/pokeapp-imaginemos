export interface ContextInter {
  drawer: boolean;
  pokemonName: string;
  setPokemon: (name: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}
