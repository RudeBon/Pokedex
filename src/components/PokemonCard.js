import React, { useState, useEffect, useContext } from 'react'
import { useObserver } from 'mobx-react'
import 'antd/dist/antd.css'
import { Card, Avatar, Tag, Divider, Modal, Collapse } from 'antd' // modal
import { pokemonContext } from '../stores/PokemonProvider'
const { Panel } = Collapse // modal

export default function PokemonCard(props) {
    const pokemonStore = useContext(pokemonContext)
    const [isLoading, setIsLoading] = useState(true)
    const pokemon = props.pokemon
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        async function fetchData() {
            await pokemonStore.getSinglePokemon(pokemon.url)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    function openModal() {
        setVisible(prev => !prev)
    }

    function getPokemonInfo() {    
        // TODO: consider to change url-key to id and object to array
        return pokemonStore.pokemonsInfo[pokemon.url]
    }

    function getTagColor(tagName){
        if (pokemonStore.tagColors[tagName] == undefined) {
            return '#C1C1C1' 
        }
        return pokemonStore.tagColors[tagName]
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
                        getPokemonInfo().types.map(x => <Tag color={getTagColor(x.type.name)} key={x.type.name}>{x.type.name}</Tag>)
                    }
                </div>

            </Card>
            <Modal
                title={pokemonStore.capitalize(pokemon.name)}
                centered
                visible={visible}
                onOk={openModal}
                onCancel={openModal}
            >
                <Avatar size={64} src={!isLoading && getPokemonInfo().sprites.front_default} />
                {!isLoading && getPokemonInfo().types.map(x => <Tag color={getTagColor(x.type.name)} key={x.type.name}>{x.type.name}</Tag>)}
                <div className='stats'>
                    <h3>Stats</h3>
                    <ul className='stats-ul'>
                        {
                            !isLoading &&
                            getPokemonInfo().stats
                                .map(x =>
                                    <li key={x.stat.name}>{`${pokemonStore.capitalize(x.stat.name)}: ${x.base_stat}`}</li>)
                        }
                    </ul>
                </div>
                <div className='pokeInfoGrid'>
                    <div className='characteristics'>
                        <h3>Characteristics</h3>
                        {
                            !isLoading &&
                            <ul className='characteristics-ul'>
                                <li>{`Weight: ${getPokemonInfo().weight}`}</li>
                                <li>{`Height: ${getPokemonInfo().height}`}</li>
                            </ul>
                        }
                    </div>
                    <div className='abilities'>
                        <h3>Abilities</h3>
                        <ul className='abilities-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().abilities.map(x =>
                                    <li key={x.ability.name}>{pokemonStore.capitalize(x.ability.name)}</li>)
                            }
                        </ul>
                    </div>
                    <div className='forms'>
                        <h3>Forms</h3>
                        <ul className='forms-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().forms.map(x =>
                                    <li key={x.name}>{pokemonStore.capitalize(x.name)}</li>)
                            }
                        </ul>
                    </div>
                    <div className='items'>
                        <h3>Held Items</h3>
                        <ul className='items-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().held_items.map(x => <li key={x.item.name}>{pokemonStore.capitalize(x.item.name)}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <Collapse>
                    <Panel header='Moves' key='1'>
                        <ul className='moves-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().moves.map(x => <li key={x.move.name}> {pokemonStore.capitalize(x.move.name)}</li>)
                            }
                        </ul>
                    </Panel>
                </Collapse>
            </Modal>
        </div>
    ))
}
