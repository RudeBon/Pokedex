import React, { useState, useEffect, useContext } from 'react'
import { observer, useObserver } from 'mobx-react'
import 'antd/dist/antd.css'
import { Input, Select } from 'antd'
import { pokemonContext } from '../stores/PokemonProvider'

const { Search } = Input
const { Option } = Select

export default function Filter() {
  const pokemonStore = useContext(pokemonContext)
  const [types, setTypes] = useState([])
  const url = 'https://pokeapi.co/api/v2/type'

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTypes(data.results)
      })
  }, [])

  const children = []
  types.forEach(type => children.push(<Option key={type.name}>{type.name}</Option>))

  function handleChangeSelect(value) {
    if (value.length == 0) {      
      pokemonStore.getPokemons();
      // if (pokemonStore.searchResult.length > 0) {
      //   pokemonStore.searchResult = pokemonStore.pokemons.filter(x => x.name.search(value.toLowerCase()) !== -1);
      //   pokemonStore.count = pokemonStore.searchResult.length
      // }
      return 
    }
    pokemonStore.selectedTags = value
    pokemonStore.clearPokemons();
    pokemonStore.applyTags(pokemonStore.selectedTags)

    // console.log(pokemonStore.pokemons)
  };

  function handleSearch(value) {
    if (value === '') {
      pokemonStore.searchResult = null;
      pokemonStore.count = pokemonStore.pokemons.length
      return 
    }
    pokemonStore.searchResult = pokemonStore.pokemons.filter(x => x.name.search(value.toLowerCase()) !== -1);
    pokemonStore.count = pokemonStore.searchResult.length
  }

  return useObserver(() => (
    <div>
      <Search
        placeholder="Start typing pokemon's name"
        onSearch={handleSearch}
        style={{ width: '50%', minWidth: '300px' }}
      />
      <Select
        mode='multiple'
        allowClear
        placeholder='Select pokemon type (multiple options)'
        onChange={handleChangeSelect}
        style={{ width: '50%', minWidth: '300px' }}
      >
        {children}
      </Select>
    </div>

  ))
}
