import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Card, Avatar, Tag, Divider, Modal, Collapse } from 'antd' // modal
const { Panel } = Collapse  // modal

export default function PokemonCard(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [avatar, setAvatar] = useState()
    const [info, setInfo] = useState([])
    const pokemon = props.pokemon
    const [visible, setVisible] = useState(false) // modal


    useEffect(() => {
        setIsLoading(true)
        fetch(pokemon.url)
            .then(res => res.json())
            .then(data => {
                setInfo(data)
                setAvatar(data.sprites.front_default)
                setIsLoading(false)
            })
    }, [pokemon])

    function openModal() {
        setVisible(prev => !prev)
    }

    // console.log('card', info && info.stats && info.stats/*.stats[0].stat.name*/);
    // console.log('isLoading', isLoading);

    return (
        <div>
            <Card title={pokemon.name} extra={<Avatar size={40} src={avatar} />} onClick={openModal}>
                {/* <p>Base experience: {!isLoading && !!info.stats && info.stats[0]}</p> */}
                <div>
                    <Divider orientation='left'>Stats</Divider>
                    <ul style={{ 'list-style-type': 'none' }}>
                        {
                            !isLoading &&
                            info.stats.map(x => <li> {`${x.stat.name}: ${x.base_stat}`}</li>)
                        }
                    </ul>
                </div>
                <div>
                    <Divider orientation='left'>Types</Divider>
                    {
                        !isLoading &&
                        info.types.map(x => <Tag>{x.type.name}</Tag>)
                    }
                </div>

            </Card>
            <Modal
                title={pokemon.name}
                centered
                visible={visible}
                onOk={openModal}
                onCancel={openModal}
            >
                <Avatar size={64} src={avatar} />
                {!isLoading && info.types.map(x => <Tag>{x.type.name}</Tag>)}
                <div className="stats">
                    <h3>Stats</h3>
                    <ul className="stats-ul">
                        {
                            !isLoading &&
                            info.stats.map(x => <li> {`${x.stat.name}: ${x.base_stat}`}</li>) // add key attribute
                        }
                    </ul>
                </div>
                <div className="pokeInfoGrid">
                    <div className="characteristics">
                        <h3>Characteristics</h3>
                        {
                            !isLoading &&
                            <ul className="characteristics-ul">
                                <li>{`weight: ${info.weight}`}</li>
                                <li>{`height: ${info.height}`}</li>
                            </ul>
                        }
                    </div>
                    <div className="abilities">
                        <h3>Abilities</h3>
                        <ul className="abilities-ul">
                            {
                                !isLoading &&
                                info.abilities.map(x => <li key={x.ability.name}>{x.ability.name}</li>) // add key attribute
                            }
                        </ul>
                    </div>
                    <div className="forms">
                        <h3>Forms</h3>
                        <ul className="forms-ul">
                            {
                                !isLoading &&
                                info.forms.map(x => <li key={x.name}>{x.name}</li>) // add key attribute
                            }
                        </ul>
                    </div>
                    <div className="items">
                        <h3>Held Items</h3>
                        <ul className="items-ul">
                            {
                                !isLoading &&
                                info.held_items.map(x => <li key={x.item.name}>{x.item.name}</li>)
                                // info.held_items.length == 0 ? <li>none</li> : info.held_items.map(x => <li key={x.item.name}>{x.item.name}</li>)                                
                            }
                        </ul>
                    </div>
                </div>
                <Collapse >
                    <Panel header="Moves" key="1">
                        <ul className="moves-ul">
                            {
                                !isLoading &&
                                info.moves.map(x => <li key={x.move.name}> {x.move.name}</li>) //  add key attribute
                            }
                        </ul>
                    </Panel>
                </Collapse>
            </Modal>
        </div>
    )
}
