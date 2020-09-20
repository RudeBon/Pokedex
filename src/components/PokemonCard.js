import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
import { Card, Avatar, Tag, Divider, Modal, Collapse } from 'antd' // modal
import { observer } from 'mobx-react'
import { useObserver } from "mobx-react";
import { pokemonContext } from "../stores/PokemonProvider";
const { Panel } = Collapse  // modal

export default function PokemonCard(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [avatar, setAvatar] = useState()
    const [info, setInfo] = useState([])
    const pokemon = props.pokemon
    const [visible, setVisible] = useState(false) // modal
    const pokemonStore = useContext(pokemonContext);


    // useEffect(async () => {
    //     console.log('useEffectqwe');
    //     // setIsLoading(true)
    //     // fetch(pokemon.url)
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         setInfo(data)
    //     //         setAvatar(data.sprites.front_default)
    //     //         setIsLoading(false)
    //     //     });
    //     (await pokemonStore.getSinglePokemon(pokemon.url))
    //     setIsLoading(false)
    // }, [])

    useEffect(() => {
        async function fetchData() {
          // You can await here
            await pokemonStore.getSinglePokemon(pokemon.url);
            setIsLoading(false);
          // ...
        }
        fetchData();
      }, []);

    function openModal() {
        setVisible(prev => !prev)
    }

    function getPokemonInfo() {
        // console.log("getPokemonInfo", isLoading);
        // console.log("getPokemonInfo", JSON.stringify(!isLoading && pokemonStore.pokemonDetails));
        // console.log("getPokemonInfo", pokemon.url);
        return pokemonStore.pokemonsInfo[pokemon.url];
    }

    // console.log('card', info && pokemonStore.pokemonsInfo[pokemon.url].stats && pokemonStore.pokemonsInfo[pokemon.url].stats/*.stats[0].stat.name*/);
    // console.log('isLoading', isLoading);

    return (
        <div>
            <Card title={pokemon.name} extra={<Avatar size={40} src={!isLoading && getPokemonInfo().sprites.front_default} />} 
                onClick={openModal}>
                {/* <p>Base experience: {!isLoading && !!getPokemonInfo().stats && getPokemonInfo().stats[0]}</p> */}
                <div>
                    <Divider orientation='left'>Stats</Divider>
                    <ul style={{ 'list-style-type': 'none' }}>
                        {
                            !isLoading &&
                            getPokemonInfo().stats.map(x => <li> {`${x.stat.name}: ${x.base_stat}`}</li>)
                        }
                    </ul>
                </div>
                <div>
                    <Divider orientation='left'>Types</Divider>
                    {
                        !isLoading &&
                        getPokemonInfo().types.map(x => <Tag>{x.type.name}</Tag>)
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
                <Avatar size={64} src={!isLoading && getPokemonInfo().sprites.front_default} />
                {!isLoading && getPokemonInfo().types.map(x => <Tag>{x.type.name}</Tag>)}
                <div className="stats">
                    <h3>Stats</h3>
                    <ul className="stats-ul">
                        {
                            !isLoading &&
                            getPokemonInfo().stats
                                .map(x => 
                                    <li> 
                                        {`${x.stat.name}: ${x.base_stat}`}
                                    </li>) // add key attribute
                        }
                    </ul>
                </div>
                <div className="pokeInfoGrid">
                    <div className="characteristics">
                        <h3>Characteristics</h3>
                        {
                            !isLoading &&
                            <ul className="characteristics-ul">
                                <li>{`weight: ${getPokemonInfo().weight}`}</li>
                                <li>{`height: ${getPokemonInfo().height}`}</li>
                            </ul>
                        }
                    </div>
                    <div className="abilities">
                        <h3>Abilities</h3>
                        <ul className="abilities-ul">
                            {
                                !isLoading &&
                                getPokemonInfo().abilities.map(x => 
                                    <li key={x.ability.name}>{x.ability.name}</li>) // add key attribute
                            }
                        </ul>
                    </div>
                    <div className="forms">
                        <h3>Forms</h3>
                        <ul className="forms-ul">
                            {
                                !isLoading &&
                                getPokemonInfo().forms.map(x => 
                                    <li key={x.name}>{x.name}</li>) // add key attribute
                            }
                        </ul>
                    </div>
                    <div className="items">
                        <h3>Held Items</h3>
                        <ul className="items-ul">
                            {
                                !isLoading &&
                                getPokemonInfo().held_items.map(x => <li key={x.item.name}>{x.item.name}</li>)
                                // getPokemonInfo().held_items.length == 0 ? <li>none</li> : getPokemonInfo().held_items.map(x => <li key={x.item.name}>{x.item.name}</li>)                                
                            }
                        </ul>
                    </div>
                </div>
                <Collapse >
                    <Panel header="Moves" key="1">
                        <ul className="moves-ul">
                            {
                                !isLoading &&
                                getPokemonInfo().moves.map(x => <li key={x.move.name}> {x.move.name}</li>) //  add key attribute
                            }
                        </ul>
                    </Panel>
                </Collapse>
            </Modal>
        </div>
    )
}
