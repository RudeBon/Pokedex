import React, { useState, useEffect, useContext } from 'react'
import { useObserver } from 'mobx-react'
import 'antd/dist/antd.css'
import { Card, Avatar, Tag, Divider } from 'antd'
import { pokemonContext } from '../stores/PokemonProvider'
import PokemonModal from './PokemonModal'

export default function PokemonCard (props) {
  const pokemonStore = useContext(pokemonContext)
  const [isLoading, setIsLoading] = useState(true)
  const pokemon = props.pokemon
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    async function fetchData () {
      await pokemonStore.getSinglePokemon(pokemon.url)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function openModal () {
    setVisible(prev => !prev)
  }

  function getPokemonInfo () {
    // TODO: consider to change url-key to id and object to array
    return pokemonStore.pokemonsInfo[pokemon.url]
  }

  return useObserver(() => (
    <div>
      <Card
        title={pokemonStore.capitalize(pokemon.name)}
        extra={<Avatar size={40} src={!isLoading && getPokemonInfo().sprites.front_default} />}
        onClick={openModal}
      >
        <div>
          <Divider orientation='left'>Stats</Divider>
          <ul style={{ listStyleType: 'none' }}>
            {
              !isLoading &&
                            getPokemonInfo().stats.map(x =>
                              <li key={x.stat.name}>{`${pokemonStore.capitalize(x.stat.name)}: ${x.base_stat}`}</li>)
            }
          </ul>
        </div>
        <div>
          <Divider orientation='left'>Types</Divider>
          {
            !isLoading &&
                        getPokemonInfo().types.map(x => <Tag color={pokemonStore.getTagColor(x.type.name)} key={x.type.name}>{x.type.name}</Tag>)
          }
        </div>

      </Card>
      {isLoading
        ? (<div>Data is Loading</div>)
        : (<PokemonModal
          pokemon={pokemon}
          visible={visible}
          handleModal={() => openModal()}
          getPokemonInfo={() => getPokemonInfo()}
            >
           </PokemonModal>)}
    </div>
  ))
}
