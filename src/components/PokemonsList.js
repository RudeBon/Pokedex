import React from 'react'
import pList from '../tempPokemonList.json'
import PokemonCard from './PokemonCard'

export default function PokemonList () {
  const PokeCard = pList.results.map((pokemon, index) =>
    <li key={index} className='pokemon-list_li flexItem-card'>
      <PokemonCard
        pokemon={pokemon} key={index}
      />
    </li>
  )

  console.log(pList.results)

  return (
    <ul>
      {PokeCard}
    </ul>
  )
}
