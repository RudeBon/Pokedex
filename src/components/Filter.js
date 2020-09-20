import React, { useState, useEffect, useContext } from 'react'
import { useObserver } from 'mobx-react'
import 'antd/dist/antd.css'
import { Input, Select } from 'antd'
import { pokemonContext } from '../stores/PokemonProvider'

const { Search } = Input
const { Option } = Select

export default function Filter () {
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

  function handleChangeSelect (value) {
    pokemonStore.selectedTags = value
    pokemonStore.applyFilters()
  };

  function handleSearch (value) {
    pokemonStore.searchValue = value
    pokemonStore.applyFilters()
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
