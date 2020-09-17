import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card } from 'antd'

export default function PokemonCard (props) {
  const [thisPokemon, setThisPokemon] = useState()

  const pokemon = props.pokemon
  console.log(pokemon)
  return (
    <div>
      <Card title={pokemon.name} extra={<a href={pokemon.url}>See More</a>}>
        <p>What a great pokemon!</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}
