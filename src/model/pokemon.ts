
export type Pokemon = {
  id: number
  name: string;
  pokemon_v2_pokemonspecy: { pokemon_v2_pokemons: { height: string, weight: string, pokemon_v2_pokemonsprites: [{ sprites: string }] }[]; };
}
