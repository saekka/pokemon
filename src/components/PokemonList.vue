<script setup lang="ts">
import PokemonItem from './PokemonItem.vue';
import type { Pokemon } from '../model/pokemon';
import { nextTick, onMounted, reactive, watch } from 'vue';

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps<{ pokemons: Pokemon[], height?: string }>();
let pokemons: Pokemon[];

const flag = reactive({ isLoading: false })

const setPokemon = () => {
  pokemons = props.pokemons
  if (props.height) {
    pokemons = pokemons.filter(item => Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].height) * 10 == Number(props.height));
  }
}

const toggleLoadingFlag = () => {
  flag.isLoading = !flag.isLoading

}
onMounted(() => {
  toggleLoadingFlag()
  setPokemon()
  setTimeout(toggleLoadingFlag, 1000)
})
pokemons = props.height ? props.pokemons.filter(item => { item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].height === props.height }) : props.pokemons
watch(
  () => props.height,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      toggleLoadingFlag()
      setTimeout(setPokemon, 1000)
      nextTick()
      setTimeout(toggleLoadingFlag, 1000)
    }

  },
  { deep: true, flush: 'pre' },
)


</script>

<template>
  <section class="loading" v-if="flag.isLoading">
    <div class="ball">
      <span class="ball-line"></span>
      <span class="shine"></span>
      <div class="band">
        <span class="band-inner mod-gold"></span>
        <span class="band-inner mod-white"></span>
        <button class="band-button" type="button"></button>
      </div> <span class="ball__band mod-gold"></span> -->
    </div>
    <p class="loading-text">Loading</p>
  </section>
  <section v-else>
    <template v-if="pokemons.length > 0">
      <dl class="pokemon-list">
        <PokemonItem class="pokemon-list__item" v-for="(pokemon, i) in pokemons" :key="i" :pokemon="pokemon" />
      </dl>
    </template>
    <template v-else>
      <p class="pokemon-list__nodata">同じ体型のポケモンはいないみたい...</p>
    </template>
  </section>
</template>

<style lang="sass" scoped>
.pokemon-list
  display: grid
  justify-content: center
  grid-gap: 30px 15px
  grid-template-columns: 1fr 1fr

  @media screen and (min-width:480px)
    grid-template-columns: repeat(auto-fill,140px)

  &__nodata
    text-align: center

$gold : #f0bd4b

@mixin positionCenter
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.loading
  position: relative  
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 40vh

.loading-text
  transform: translateY(-15px)
  color: $gold
  letter-spacing: .2em
.ball
  overflow: hidden
  transform: scale(0.5)
  width: 120px
  height: 120px
  border-radius: 50%
  background: linear-gradient(to bottom, #222 8%, $gold 8% 20%, #222 20% 80%)
  box-shadow: -20px -10px 40px rgba(#000, .5) inset, 0px -1px 4px 0px #fff
  animation: loading 2s ease-out 0s infinite


.band
  width: 100%
  height: 100%

.band-button
  @include positionCenter
  width: 30px
  height: 30px
  border-radius: 50%
  border: none
  background-color: $gold
  z-index: 3
  box-shadow: 2px 2px 4px rgba(0,0,0,0.4), -3px -3px 4px rgba(255,255,255,0.4)

  &:after
    @include positionCenter
    content: ''
    width: 15px
    height: 15px
    border-radius: 50%
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4), -3px -3px 4px rgba(255,255,255,0.4)

.ball-line
  top: 9px
  position: absolute
  background-color: $gold
  height: 15px
  width: 100%
  box-shadow: 0px 0px 1px 1px #000

  &:before
    content: ''
    top: 4px
    position: absolute
    background-color: #d50000
    height: 7px
    width: 100%
    box-shadow: 1px 1px 1px 2px #c70202 inset

.shine
  position: absolute
  height: 40%
  width: 60%
  background-color: #fff
  left: 0%
  opacity: 0.2
  border-bottom-right-radius: 75%
  border-top-right-radius: 65%
  z-index: 2
.band-inner
  @include positionCenter
  border-radius: 50%
  background-color: #222
  width: 60px
  height: 60px
  
  &:before, &:after
    @include positionCenter
    content: ''

  &:before
    width: 200px
    height: 30px
    background: linear-gradient(to right, #e0e2ee 8%, #e0e2ee 9% 11%, #e0e2ee 11% 12%, #fff 17% 19%, #e0e2ee 22% 50%, #e0e2ee 50% 60%, #e0e2ee 60% 70%, #e0e2ee 70% 76%, #fff 81% 83%, #e0e2ee 88% 91%)
    border: 2px solid #222
  
  &:after
    background: linear-gradient(to right, #e0e2ee 8%, #e0e2ee 9% 11%, #e0e2ee 11% 12%, #fff 17% 19%, #e0e2ee 22% 50%, #e0e2ee 50% 60%, #e0e2ee 60% 70%, #e0e2ee 70% 76%, #fff 81% 83%, #e0e2ee 88% 91%)
    width: 50px
    height: 50px
    border-radius: 50%

  &.mod-gold
    width: 45px
    height: 45px
    z-index: 1

    &:before, &:after
      content: ''

    &:before
      @include positionCenter
      width: 130px
      height: 20px
      background: linear-gradient(to right, $gold 7%, #feffad 13% 17%, $gold 27% 50%, $gold 50% 60%, $gold 60% 70%, $gold 70% 64%, #feffad 85% 87%, $gold 94% 97%)
    
    &:after
      width: 41px
      height: 41px
      background: linear-gradient(to right, $gold 32%, #feffad 51% 44%, $gold 68%)

@keyframes loading
  0%
    transform: scale(0.5) rotate(-35deg)
  50%
    transform: scale(0.5) rotate(35deg)
  100%
    transform: scale(0.5) rotate(-35deg)


</style>