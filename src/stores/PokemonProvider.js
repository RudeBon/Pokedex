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
    searchResult: [],
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
    
    hasSearchResult() {
      return store.searchResult && store.searchResult.length > 0
    },
    getSearchOrAll() {
      return store.hasSearchResult() ? store.searchResult : store.pokemons;
    },
    async applyTags() {
      if(store.selectedTags.length === 0) {
        return;
      }

      let tagsResultSet = [];
      for (const tag of store.selectedTags) {
        try {
          await fetch(`https://pokeapi.co/api/v2/type/${tag}`)
            .then(res => res.json())
            .then(data => {
              const pokemonsWithThisTag = data.pokemon.map(x => x.pokemon)
              tagsResultSet = [...new Set([...tagsResultSet, ...pokemonsWithThisTag])]
            })
            .then(() => {      
              store.searchResult = tagsResultSet;
            })
        } catch (e) {
          store.setError(e)
        }
      }
    },
    async applySearch() {
      console.log('searchValue', store.searchValue);
      if(store.searchValue == '') {
        return;
      }

      store.searchResult = store.searchResult
          .filter(x => x.name.search(store.searchValue.toLowerCase()) !== -1);
    },
    async applyFilters() {
      store.searchResult = store.pokemons;
      await this.applyTags();
      await this.applySearch();
      store.count = store.searchResult.length
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
