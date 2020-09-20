import React, { useEffect, useState, useContext  } from 'react'
import PokemonCard from './PokemonCard'
import { observer } from 'mobx-react'
import { useObserver } from "mobx-react";
import { pokemonContext } from "../stores/PokemonProvider";

export default function PokemonList () {
  const pokemonStore = useContext(pokemonContext);

  useEffect(() => {
      console.log('getPokemons 0');
      pokemonStore.getPokemons();
  }, [])

  // const PokeCard = list.map((pokemon, index) =>
  //   <li key={pokemon.name} className='pokemonList_li'>
  //     <PokemonCard
  //       pokemon={pokemon} key={index}
  //     />
  //   </li>
  // )

  function getPokeCardStored() {
    return pokemonStore.pokemons.map((pokemon, index) =>
    <li key={pokemon.name} className='pokemonList_li'>
      <PokemonCard
        pokemon={pokemon} key={index}
      />
    </li>
  )
  }

  const PokeCardStored = pokemonStore.isLoading && pokemonStore.pokemons.map((pokemon) =>
    <li>{pokemon.name}</li> 
  )

  console.log(PokeCardStored)
  console.log('pokemonStore', !pokemonStore.isLoading && pokemonStore.pokemons.map(x => x.name))

  return useObserver(() => (
    <div>
      <p>There is {pokemonStore.count} pokemons</p>
      <ul className='pokemonList-ul'>        
          {pokemonStore.isLoading ? (<li>Loading...</li>) : getPokeCardStored()}
      </ul>
      {/* {pokemonStore.isLoading ? ('da') : ('net')} */}
    </div>
  ))
}