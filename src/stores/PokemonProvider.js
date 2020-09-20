import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const PokemonProvider = ({ children }) => {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  const store = useLocalStore(() => ({

    /*observables here*/
    pokemons: [],
    pokemonsInfo: {}, //в pokemons
    count: 0,
    isLoading: false,
    error: "",
    /*actions here*/
    async getPokemons() {
      store.isLoading = true;
      // console.log('getPokemons4()', store.isLoading);
      try {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            store.count = data.count;
            store.pokemons = data.results;

            // console.log('getPokemons3()', store.isLoading);
            // console.log('getPokemons()', data.results);
            // console.log('getPokemons2()', store.pokemons.map(x => x.name));
          })
          .then(() =>
            store.isLoading = false
          );
        // store.pokemons = [{id: 1, name: 'qwerty'}, {id: 2, name: 'qwerty2'}];
      } catch (e) {
        store.setError(e);
      }
    },
    async getSinglePokemon(url) {
      store.isLoading = true;
      console.log('getSinglePokemon4()', store.isLoading);
      try {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            store.pokemonsInfo[url] = data;
            console.log('getPokemon data', data);
            // store.pokemons.find(x => x.url == url).details = data;

            // console.log('getPokemons3()', store.isLoading);
            // console.log('getPokemons()', data.results);
            // console.log('getPokemons2()', store.pokemons.map(x => x.name));
          })
          .then(() =>
            store.isLoading = false
          );
        // store.pokemons = [{id: 1, name: 'qwerty'}, {id: 2, name: 'qwerty2'}];
      } catch (e) {
        store.setError(e);
      }
    }
    /*computed values i.e. derived state here*/
  }));
  return <pokemonContext.Provider value={store}>{children}</pokemonContext.Provider>;
};
export const pokemonContext = createContext();