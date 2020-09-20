import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
import { Card, Avatar, Tag, Divider, Modal, Collapse } from 'antd' // modal
import { pokemonContext } from '../stores/PokemonProvider'
const { Panel } = Collapse // modal

export default function PokemonModal (props) {
    const pokemonStore = useContext(pokemonContext)
    const visible = props.visible

    
    return(
        <>
            <Modal
                title={getPokemonInfo().name}
                centered
                visible={visible}
                onOk={openModal}
                onCancel={openModal}
            >
                <Avatar size={64} src={!isLoading && getPokemonInfo().sprites.front_default} />
                {!isLoading && getPokemonInfo().types.map(x => <Tag key={x.type.name}>{x.type.name}</Tag>)}
                <div className='stats'>
                    <h3>Stats</h3>
                    <ul className='stats-ul'>
                        {
                            !isLoading &&
                            getPokemonInfo().stats
                                .map(x =>
                                    <li key={x.stat.name}>{`${x.stat.name}: ${x.base_stat}`}</li>)
                        }
                    </ul>
                </div>
                <div className='pokeInfoGrid'>
                    <div className='characteristics'>
                        <h3>Characteristics</h3>
                        {
                            !isLoading &&
                            <ul className='characteristics-ul'>
                                <li>{`weight: ${getPokemonInfo().weight}`}</li>
                                <li>{`height: ${getPokemonInfo().height}`}</li>
                            </ul>
                        }
                    </div>
                    <div className='abilities'>
                        <h3>Abilities</h3>
                        <ul className='abilities-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().abilities.map(x =>
                                    <li key={x.ability.name}>{x.ability.name}</li>)
                            }
                        </ul>
                    </div>
                    <div className='forms'>
                        <h3>Forms</h3>
                        <ul className='forms-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().forms.map(x =>
                                    <li key={x.name}>{x.name}</li>)
                            }
                        </ul>
                    </div>
                    <div className='items'>
                        <h3>Held Items</h3>
                        <ul className='items-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().held_items.map(x => <li key={x.item.name}>{x.item.name}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <Collapse>
                    <Panel header='Moves' key='1'>
                        <ul className='moves-ul'>
                            {
                                !isLoading &&
                                getPokemonInfo().moves.map(x => <li key={x.move.name}> {x.move.name}</li>)
                            }
                        </ul>
                    </Panel>
                </Collapse>
            </Modal>
        </>
    )
}