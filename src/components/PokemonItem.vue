
<script setup lang="ts">
import { watch, nextTick } from 'vue';
import type { Pokemon } from '../model/pokemon';

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps<{ pokemon: Pokemon }>();
const getImageUrl = (raw: string) => {
  const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/';
  // console.log(JSON.parse(raw).front_default.replace('/media/', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/'))
  // let image = JSON.parse(raw).front_default ? JSON.parse(raw).front_default : JSON.parse(raw).other['official-artwork'].front_default;
  let image = JSON.parse(raw).other['official-artwork'].front_default;
  if (image) {
    image = image.replace('/media/', url)
  }
  return image
}
// eslint-disable-next-line vue/no-setup-props-destructure
let path = props.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0];
let image = path.pokemon_v2_pokemonsprites[0].sprites;
let height = (Number(path.height) * 10).toFixed(1);
let weight = (Number(path.weight) / 10).toFixed(1);

const setItem = () => {
  path = props.pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0];
  image = path.pokemon_v2_pokemonsprites[0].sprites;
  height = (Number(path.height) * 10).toFixed(1);
  weight = (Number(path.weight) / 10).toFixed(1);
}

watch(
  () => props.pokemon,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      nextTick()
      setItem()
    }
  },
  { deep: true, flush: 'pre' },
)

</script>

<template>
  <div class="pokemon-item">
    <template v-if="image">
      <dt class="pokemon-item__image-wrapper">
        <img class="pokemon-item__image" :src="getImageUrl(image)" :alt="props.pokemon.name" width="100" height="100"
          loading="lazy">
      </dt>
    </template>
    <dt class="pokemon-item__heading">{{ props.pokemon.name }}</dt>
    <dd class="pokemon-item__data">高さ : {{ height }}cm</dd>
    <dd class="pokemon-item__data">重さ : {{ weight }}kg</dd>
  </div>
</template>

<style scoped lang="sass">
.pokemon-item
  display: flex
  flex-wrap: wrap
  justify-content: center

  &__image
    object-fit: contain
  
  &__heading
    margin-top: 10px
    flex-basis: 100%
    text-align: center
    font-weight: bold
  
  &__data
    margin-top: 2px
    font-size: 14px
</style>