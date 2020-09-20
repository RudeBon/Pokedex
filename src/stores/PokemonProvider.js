import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react-lite'

export const PokemonProvider = ({ children }) => {
  const url = 'https://pokeapi.co/api/v2/pokemon'
  const store = useLocalStore(() => ({

    /* observables here */
    pokemons: [],
    pokemonsInfo: {},
    pokemonDetails: [], // TODO
    pagination: {
      limit: 10,
      offset: 0
    },
    selectedTags: [],
    searchResult: null,
        // pokemonsFilteredByTag: [],
    count: 0,
    isLoading: false,
    error: '',
    /* actions here */
    async applyTags(tags) {
      tags.forEach(tag => {
        try {
          fetch(`https://pokeapi.co/api/v2/type/${tag}`)
            .then(res => res.json())
            .then(data => {
              let newPokemons = data.pokemon.map(x => x.pokemon)
              let result = store.pokemons.concat(newPokemons);
              store.pokemons = [...new Set([...store.pokemons, ...newPokemons])];
              store.count = store.pokemons.length
              // store.count = data.count
            })
        } catch (e) {
          store.setError(e)
        }
      })
    },
    async getPokemons() {
      store.isLoading = true
      try {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            store.count = data.count
          })
          .then(() => {
            fetch(`${url}?offset=0&limit=${store.count}`)
            .then(res => res.json())
            .then(data => {
              store.pokemons = data.results
            })
            .then(() => {
              store.isLoading = false
            }
            )
          }
          )

      } catch (e) {
        store.setError(e)
      }
    },
    async getSinglePokemon(url) {
      try {
        await fetch(url)
          .then(res => res.json())
          .then(data => {
            store.pokemonsInfo[url] = data
            // store.pokemonDetails.push({id: data.id, details: data});
          })
      } catch (e) {
        store.setError(e)
      }
    },
    clearPokemons() {
      store.pokemons = [];
    }
    /* computed values i.e. derived state here */
  }))
  return <pokemonContext.Provider value={store}>{children}</pokemonContext.Provider>
}
export const pokemonContext = createContext()
