<template>
  <form class="pokemon-form">
    <label class="pokemon-form__label">
      <span>身長</span>
      <input id="height" class="pokemon-form__input" type="text" v-model="height">
      <span class="pokemon-form__unit">cm</span>
    </label>
  </form>
  <template v-if="fetchdata">
    <div class="pokemon-form__list">
      <PokemonList :pokemons="fetchdata" :height="height" />
    </div>
  </template>
</template>

<script setup lang="ts" >
import { ref } from 'vue';
import { useQuery, provideApolloClient } from '@vue/apollo-composable';
import gql from "graphql-tag"
import { apolloClient } from '../main';
import PokemonList from './PokemonList.vue';
import type { Pokemon } from '../model/pokemon';

const height = ref<string>();

type Query = {
  [x: string]: Pokemon[];
  pokemons: Pokemon[]
} | undefined;

const fetchdata = ref<Query>();

// https://v4.apollo.vuejs.org/guide-composable/setup.html#usage-outside-of-setup
// 
provideApolloClient(apolloClient);

const getAllPokemons = () => {
  const query = gql`
    query {
      pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 1}}) {
      name
      id
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemons {
          height
          weight
          pokemon_v2_pokemonsprites(where: {}) {
            sprites
          }
        }
      }
    }
  }
`;

  const { onResult } = useQuery<Query>(query);

  onResult(result => {
    fetchdata.value = result.data.pokemon_v2_pokemonspeciesname
      ;
  });
};


getAllPokemons();

</script>

<style lang="sass" scoped>
.pokemon-form
  display: flex
  justify-content: center

  &__label
    display: flex
    align-items: center

  &__input
    margin-left: 1em
    padding: 0.5em

  &__unit
    margin-left: 0.5em
    align-self: end

  &__list
    margin-top: 40px

</style>