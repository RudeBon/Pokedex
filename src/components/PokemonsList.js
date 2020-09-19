import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList () {
  const url = 'https://pokeapi.co/api/v2/pokemon'

  const [count, setCount] = useState(null)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCount(data.count)
        setList(data.results)
      })
  }, [])

  const PokeCard = list.map((pokemon, index) =>
    <li key={pokemon.name} className='pokemonList_li'>
      <PokemonCard
        pokemon={pokemon} key={index}
      />
    </li>
  )

  // console.log(pList.results)

  return (
    <div>
      <p>There is {count} pokemons</p>
      <ul className='pokemonList-ul'>
        {PokeCard}
      </ul>
    </div>
  )
}
