<template>
  <div>
    <form class="pokemon-form">
      <label class="pokemon-form__label">
        <span class="pokemon-form__label-text">身長</span>
        <input id="height" class="pokemon-form__input" type="text" v-model="height">
        <span class="pokemon-form__unit">cm</span>
        <button type="button" class="pokemon-form__delete-button" @click="height = ''" :disabled="height === ''">
          <img class="pokemon-form__delete-button-icon" src="../assets/trash-icon.svg" alt="削除">
        </button>
      </label>
      <label class="pokemon-form__label">
        <span class="pokemon-form__label-text">体重</span>
        <input id="weight" class="pokemon-form__input" type="text" v-model="weight">
        <span class="pokemon-form__unit">kg</span>
        <button type="button" class="pokemon-form__delete-button" @click="weight = ''" :disabled="weight === ''">
          <img class="pokemon-form__delete-button-icon" src="../assets/trash-icon.svg" alt="削除">
        </button>
      </label>
    </form>
    <template v-if="fetchdata">
      <div class="pokemon-form__list">
        <PokemonList :pokemons="fetchdata" :height="height" :weight="weight" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue';
import { useQuery, provideApolloClient } from '@vue/apollo-composable';
import gql from "graphql-tag"
import { apolloClient } from '../main';
import PokemonList from './PokemonList.vue';
import type { Pokemon } from '../model/pokemon';

const height = ref<string>();
const weight = ref<string>();

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
  flex-wrap: wrap
  justify-content: center

  &__label
    display: flex
    flex-wrap: wrap
    align-items: center

    & + &
      @media screen and (min-width:500px)
        margin-left: 10%

      @media screen and (max-width:480px)
        margin-top: 1em

  &__label-text + &__input
    margin-left: 1em

  &__input
    padding: 0.5em
    width: 6em

  &__unit
    margin-left: 0.5em
    align-self: end
    width: 1.5em


  &__delete-button
    width: 32px
    height: 32px
    padding: 6px
    display: flex
    margin-left: 10px
    border-radius: 50%
    background-color: #ccc
    border: none
    
  
  &__delete-button-icon
    width: 100%

  &__list
    margin-top: 8vw

    @media screen and (min-width:480px)
      margin-top: 6vw


</style>