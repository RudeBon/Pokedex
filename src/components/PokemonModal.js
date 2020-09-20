import React, {useContext } from 'react'
import 'antd/dist/antd.css'
import { Avatar, Tag, Modal, Collapse } from 'antd'
import { pokemonContext } from '../stores/PokemonProvider'
const { Panel } = Collapse

export default function PokemonModal (props) {
    const pokemonStore = useContext(pokemonContext)
    const pokemon = props.pokemon

    return(
        <>
            <Modal
                title={pokemonStore.capitalize(pokemon.name)}
                centered
                visible={props.visible}
                onOk={props.handleModal}
                onCancel={props.handleModal}
            >
                <Avatar size={64} src={props.getPokemonInfo().sprites.front_default} />
                {props.getPokemonInfo().types.map(x => <Tag color={pokemonStore.getTagColor(x.type.name)} key={x.type.name}>{x.type.name}</Tag>)}
                <div className='stats'>
                    <h3>Stats</h3>
                    <ul className='stats-ul'>
                        {
                            
                            props.getPokemonInfo().stats
                                .map(x =>
                                    <li key={x.stat.name}>{`${pokemonStore.capitalize(x.stat.name)}: ${x.base_stat}`}</li>)
                        }
                    </ul>
                </div>
                <div className='pokeInfoGrid'>
                    <div className='characteristics'>
                        <h3>Characteristics</h3>
                        {
                            
                            <ul className='characteristics-ul'>
                                <li>{`Weight: ${props.getPokemonInfo().weight}`}</li>
                                <li>{`Height: ${props.getPokemonInfo().height}`}</li>
                            </ul>
                        }
                    </div>
                    <div className='abilities'>
                        <h3>Abilities</h3>
                        <ul className='abilities-ul'>
                            {
                                
                                props.getPokemonInfo().abilities.map(x =>
                                    <li key={x.ability.name}>{pokemonStore.capitalize(x.ability.name)}</li>)
                            }
                        </ul>
                    </div>
                    <div className='forms'>
                        <h3>Forms</h3>
                        <ul className='forms-ul'>
                            {
                                
                                props.getPokemonInfo().forms.map(x =>
                                    <li key={x.name}>{pokemonStore.capitalize(x.name)}</li>)
                            }
                        </ul>
                    </div>
                    <div className='items'>
                        <h3>Held Items</h3>
                        <ul className='items-ul'>
                            {
                                
                                props.getPokemonInfo().held_items.map(x => <li key={x.item.name}>{pokemonStore.capitalize(x.item.name)}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <Collapse>
                    <Panel header='Moves' key='1'>
                        <ul className='moves-ul'>
                            {
                                
                                props.getPokemonInfo().moves.map(x => <li key={x.move.name}> {pokemonStore.capitalize(x.move.name)}</li>)
                            }
                        </ul>
                    </Panel>
                </Collapse>
            </Modal>
        </>
    )
}