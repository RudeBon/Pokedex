import React, { useEffect, useContext } from 'react'
import PokemonCard from './PokemonCard'
import { useObserver } from 'mobx-react'
import { Pagination } from 'antd'
import { pokemonContext } from '../stores/PokemonProvider'

export default function PokemonList () {
  const pokemonStore = useContext(pokemonContext)

  useEffect(() => {
    pokemonStore.getPokemons()
  }, [])

  function getPokemonCards () {
    return pokemonStore.applyPaginationToFiltered()
      .map((pokemon, index) =>
        <li key={pokemon.name} className='pokemonList_li'>
          <PokemonCard
            pokemon={pokemon} key={index}
          />
        </li>
      )
  }

  function onChange (pageNumber, limit) {
    pokemonStore.setPaginationData(pageNumber, limit)
  }

  return useObserver(() => (
    <div>
      <p>There is {pokemonStore.count} pokemons</p>
      <ul className='pokemonList-ul'>
        {pokemonStore.isLoading ? (<li>Loading...</li>) : getPokemonCards()}
      </ul>
      <Pagination showQuickJumper defaultCurrent={1} total={pokemonStore.count} onChange={onChange} />
    </div>
  ))
}
