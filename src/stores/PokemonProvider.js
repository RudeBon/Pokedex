import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const PokemonProvider = ({ children }) => {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  const store = useLocalStore(() => ({

    /*observables here*/
    pokemons: [],
    pokemonsInfo: {}, 
    pokemonDetails: [],  //TODO
    count: 0,
    isLoading: false,
    error: "",
    /*actions here*/
    async getPokemons() {
      store.isLoading = true;
      try {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            store.count = data.count;
            store.pokemons = data.results;
          })
          .then(() =>
            store.isLoading = false
          )
      } catch (e) {
        store.setError(e);
      }
    },
    async doNothing(url) {
      store.isLoading = true;
      try {
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false
    },
    async getSinglePokemon(url) {
      try {
        await fetch(url)
          .then(res => res.json())
          .then(data => {
            store.pokemonsInfo[url] = data;
            // store.pokemonDetails.push({id: data.id, details: data});
            
          })
          
      } catch (e) {
        store.setError(e);
      }
    }
    /*computed values i.e. derived state here*/
  }));
  return <pokemonContext.Provider value={store}>{children}</pokemonContext.Provider>;
};
export const pokemonContext = createContext();