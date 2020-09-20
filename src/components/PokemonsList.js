import React, { useEffect, useState, useContext } from 'react'
import PokemonCard from './PokemonCard'
import { observer, useObserver } from 'mobx-react'
import { Pagination } from 'antd'

import { pokemonContext } from '../stores/PokemonProvider'

export default function PokemonList () {
  const pokemonStore = useContext(pokemonContext)

  useEffect(() => {
    pokemonStore.getPokemons()
  }, [])

  function getPokeCardStored () {    
    let temp = pokemonStore.searchResult ?? pokemonStore.pokemons;
    return temp.slice(pokemonStore.pagination.offset, pokemonStore.pagination.offset + pokemonStore.pagination.limit).map((pokemon, index) =>
      <li key={pokemon.name} className='pokemonList_li'>
        <PokemonCard
          pokemon={pokemon} key={index}
        />
      </li>
    )
  }

  function onChange(pageNumber, limit) {
    pokemonStore.pagination = { ...pokemonStore.pagination, offset: pokemonStore.pagination.limit * (pageNumber - 1), limit:limit}
  }

  const PokeCardStored = pokemonStore.isLoading && pokemonStore.pokemons.map((pokemon) =>
    <li key={pokemon.name}>{pokemon.name}</li>
  )

  return useObserver(() => (
    <div>
      <p>There is {pokemonStore.count} pokemons</p>
      <ul className='pokemonList-ul'>
        {pokemonStore.isLoading ? (<li>Loading...</li>) : getPokeCardStored()}
      </ul>
      <Pagination showQuickJumper defaultCurrent={1} total={pokemonStore.count} onChange={onChange} />
    </div>
  ))
}
