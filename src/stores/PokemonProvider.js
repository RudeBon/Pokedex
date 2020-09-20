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
    searchValue: '',
    count: 0,
    isLoading: false,
    error: '',
    tagColors:{
      normal:'#3F8E7B',
      fighting:'#D00909',
      flying:'#B4B9DF',
      poison:'#E51DC5',
      ground:'#8B492C',
      rock:'#5A094D',
      bug:'#005C0F',
      ghost:'#935FD4',
      steel:'#6F6F6F',
      fire:'#FF7A00',
      water:'#00A3FF',
      grass:'#71C032',
      electric:'#E7D748',
      psychic:'#E2B100',
      ice:'#88D9EB',
      dragon:'#7C0C0C',
      dark:'#10158C',
      fairy:'#FC8FF1',
      unknown:'#C1C1C1',
      shadow:'#2B2B2B'
    },
    /* actions here */
    async applyTags(tags) {
      tags.forEach(tag => {
        try {
          fetch(`https://pokeapi.co/api/v2/type/${tag}`)
            .then(res => res.json())
            .then(data => {
              const newPokemons = data.pokemon.map(x => x.pokemon)
              store.pokemons = [...new Set([...store.pokemons, ...newPokemons])]
              store.count = store.pokemons.length
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
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    clearPokemons() {
      store.pokemons = []
    }
    /* computed values i.e. derived state here */
  }))
  return <pokemonContext.Provider value={store}>{children}</pokemonContext.Provider>
}
export const pokemonContext = createContext()
