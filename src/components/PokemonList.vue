<script setup lang="ts">
import PokemonItem from './PokemonItem.vue';
import type { Pokemon } from '../model/pokemon';
import { nextTick, onMounted, reactive, watch } from 'vue';

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps<{ pokemons: Pokemon[], height?: string, weight?: string }>();
let pokemons: Pokemon[];
let similarPokemons: Pokemon[];

const flag = reactive({ isLoading: false })

const setPokemon = () => {
  pokemons = props.pokemons
  similarPokemons = []

  if (props.height && props.weight) {
    pokemons = props.pokemons.filter(item => (Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].height) * 10 === Number(props.height)) && (Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].weight) / 10 === Number(props.weight)));
    return
  }
  if (props.height) {
    pokemons = props.pokemons.filter(item => Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].height) * 10 === Number(props.height));
    if (pokemons.length < 1) {
      similarPokemons = props.pokemons.filter(item => Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].height) * 10 === Math.round(Number(props.height)));
    }
    return
  }
  if (props.weight) {
    pokemons = props.pokemons.filter(item => Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].weight) / 10 === Number(props.weight));
    if (pokemons.length < 1) {
      similarPokemons = props.pokemons.filter(item => Number(item.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].weight) / 10 === Math.round(Number(props.weight)));
    }
    return
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
pokemons = props.pokemons
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
watch(
  () => props.weight,
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
    <div class="loading__ball mod-lovelove">
      <span class="loading__ball-heart mod-bg"></span>
      <span class="loading__ball-heart mod-pink"></span>
      <span class="loading__ball-shine mod-pink"></span>
      <div class="loading__ball-band">
        <span class="loading__ball-band-inner mod-lovelove"></span>
        <button class="loading__ball-band-button" type="button"></button>
      </div>
    </div>
    <div class="loading__ball mod-gorgeous">
      <span class="loading__ball-line"></span>
      <span class="loading__ball-shine"></span>
      <div class="loading__ball-band">
        <span class="loading__ball-band-inner mod-gold"></span>
        <span class="loading__ball-band-inner mod-white"></span>
        <button class="loading__ball-band-button  mod-gold" type="button"></button>
      </div>
    </div>
    <p class="loading__text">Loading</p>
  </section>
  <section v-else>
    <template v-if="pokemons.length > 0">
      <dl class="pokemon-list">
        <PokemonItem class="pokemon-list__item" v-for="(pokemon, i) in pokemons" :key="i" :pokemon="pokemon" />
      </dl>
    </template>
    <template v-else-if="similarPokemons.length > 0">
      <p class="pokemon-list__result">完全一致はいなかったけど、<br class="sp">近いポケモンはこんな感じ</p>
      <dl class="pokemon-list">
        <PokemonItem class="pokemon-list__item" v-for="(pokemon, i) in similarPokemons" :key="i" :pokemon="pokemon" />
      </dl>
    </template>
    <template v-else>
      <p class="pokemon-list__result">同じ体型のポケモンはいないみたい...</p>
    </template>
  </section>
</template>

<style lang="sass" scoped>
@media screen and (min-width:480px)
  .sp
    display: none
.pokemon-list
  display: grid
  justify-content: center
  grid-gap: 30px 15px
  grid-template-columns: 1fr 1fr

  @media screen and (min-width:480px)
    grid-template-columns: repeat(auto-fill,140px)

  &__result
    text-align: center

    & + .pokemon-list
      margin-top: 40px

$gold : #f0bd4b
$pink : #df508a

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

  &__text
    margin-top: 1em
    letter-spacing: .2em
    font-weight: 500

    @media (prefers-color-scheme: dark)
      color: $gold

    @media (prefers-color-scheme: light)
      color: $pink
  
  &__ball-shine
    height: 50%
    width: 56%
    position: absolute
    top: -3%
    left: 0%
    background-color: rgba(#fff, .2)
    border-bottom-right-radius: 75%
    border-top-right-radius: 65%
    z-index: 2

    &.mod-pink
      &:before, &:after
        @include positionCenter
        content: ''
        display: block
        
        border-radius: 50%
      
      &:before
        width: 22%
        height: 28%
        left: 72%
        top: 48%
        background-color: rgba(#fff, .6)
      
      &:after
        width: 8%
        height: 28%
        left: 90%
        top: 48%
        background-color: #fff

  &__ball-band
    width: 100%
    height: 100%
  
  &__ball-band-button
    @include positionCenter
    width: 26%
    height: 26%
    border-radius: 50%
    border: none
    z-index: 3
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4), -3px -3px 4px rgba(255,255,255,0.4)
    &.mod-gold
      background-color: $gold
    
    &:after
      @include positionCenter
      content: ''
      width: 50%
      height: 50%
      border-radius: 50%
      box-shadow: 2px 2px 4px rgba(0,0,0,0.4), -3px -3px 4px rgba(255,255,255,0.4)
  
  &__ball-heart
    width: 38%
    height: 38%
    display: inline-block
    @include positionCenter
    top: 26%

    &:before, &:after
      content: ""
      width: 56%
      height: 77%
      background-color: #ffb4cf
      border-radius: 25px 25px 0 0
      display: block
      position: absolute
    
    &:before
      transform: rotate(-45deg)
      left: 10%

    &:after
      transform: rotate(45deg)
      right: 10%
    
    &.mod-pink
      &:before
        left: 5%
      
      &:after
        right: 5%

    &.mod-bg
      width: 48%
      height: 50%
      top: 28%

      &:before, &:after
        background-color: #fff
      
  &__ball-band-inner.mod-lovelove
    @include positionCenter
    position: absolute
    background-color: #222
    content: ''
    width: 38%
    height: 38%
    border-radius: 50%
    z-index: 0

  &__ball
    overflow: hidden
    width: 60px
    height: 60px
    border-radius: 50%
    box-shadow: -24px -8px 24px  rgba(#000, 0.2) inset, 0px -1px 4px 0px #fff
    animation: loading 2s ease-out 0s infinite

    @media (prefers-color-scheme: dark)
      &.mod-lovelove
        display: none
    
    @media (prefers-color-scheme: light)
      &.mod-gorgeous
        display: none

    &.mod-lovelove
      background: linear-gradient(to bottom, $pink 48%, #222 48% 55%, #fff 55% 100%)

    &.mod-gorgeous
      background-color: #222

      .loading__ball
        $red: #de6154
        $lightRed: #e3796d
        $darkRed: #d74434
        $darkGold: #d19e5e
        $lightGold: #feffb9
  
        &-line
          top: 7%
          position: absolute
          background: linear-gradient(to right, $gold 20%, $darkGold 20% 25%, $lightGold 25% 30%, $darkGold 30% 35%, $gold 35% 70%, $lightGold 70% 75%, $gold 75% 80%, $darkGold 80% 100%)
          height: 12%
          width: 100%
          box-shadow: 0px 0px 1px 1px #000

          &:before
            content: ''
            @include positionCenter
            background: linear-gradient(to right, $red 20%, $darkRed 20% 25%, $lightRed 25% 30%, $darkRed 30% 35%, $red 35% 70%, $lightRed 70% 75%, $red 75% 80%, $darkRed 80% 100%)
            height: 45%
            width: 100%
            box-shadow: 1px 0px 1px 0.5px #a13326 inset

        &-band-inner
          @include positionCenter
          border-radius: 50%
          background-color: #222
          width: 50%
          height: 50%
          
          &:before, &:after
            @include positionCenter
            content: ''

          &:before
            width: 240%
            height: 45%
            background: linear-gradient(to right, #e0e2ee 8%, #e0e2ee 9% 11%, #e0e2ee 11% 12%, #fff 17% 19%, #e0e2ee 22% 50%, #e0e2ee 50% 60%, #e0e2ee 60% 70%, #e0e2ee 70% 76%, #fff 81% 83%, #e0e2ee 88% 91%)
            border: 1px solid #222
          
          &:after
            background: linear-gradient(to right, #e0e2ee 8%, #e0e2ee 9% 11%, #e0e2ee 11% 12%, #fff 17% 19%, #e0e2ee 22% 50%, #e0e2ee 50% 60%, #e0e2ee 60% 70%, #e0e2ee 70% 76%, #fff 81% 83%, #e0e2ee 88% 91%)
            width: 85%
            height: 85%
            border-radius: 50%

          &.mod-gold
            width: 38%
            height: 37%
            z-index: 1

            &:before, &:after
              content: ''

            &:before
              @include positionCenter
              width: 280%
              height: 36%
              background: linear-gradient(to right,$darkGold 5%, $gold 8% 10%, $lightGold 20% 22%, $gold 32% 70%, $lightGold 76% 78%, $gold 85% 91%, $darkGold 88% 100%)
            &:after
              width: 90%
              height: 90%
              background: linear-gradient(to right, $gold 32%, #feffad 51% 44%, $gold 68%)

@keyframes loading
  0%
    transform: rotate(-35deg)
  50%
    transform: rotate(35deg)
  100%
    transform: rotate(-35deg)


</style>