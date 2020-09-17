import React, { useState } from 'react'

import 'antd/dist/antd.css'
import pList from './tempPokemonList.json'
import { Input } from 'antd'
const { Search } = Input

function App () {
  const [foundPokemon, setFoundPokemon] = useState(null)

  const search = (arr, valueToSearch) => {
    const found = arr.filter(item => item.name == valueToSearch)
    if (found == undefined) { // тут проверка на пустой массив
      console.log('Nothing is found(')
    } else {
      console.log(found.name) // тут вывести по порядку все
    }
  }
  console.log(pList)

  return (
    <div className='App'>
      <p>There is {pList.count} pokemons</p>
      <Search
        placeholder="Start typing pokemon's name"
        onSearch={value => search(pList.results, value)}
        style={{ width: 800 }}
      />

      <p>{foundPokemon}</p>
    </div>
  )
}

export default App
