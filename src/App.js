import React from 'react'
import logo from './pictures/logo.png'
import 'antd/dist/antd.css'
import { Input, Layout } from 'antd'
import PokemonList from './components/PokemonsList'
import Pokemonjson from './tempPokemonList.json'

const { Search } = Input
const { Header, Footer, Content } = Layout

function App() {
  return (
    <div className='App'>
      <Layout>
        <Layout>
          <Header>
            <div className='logo'>
              <img src={logo} style={{ height: '48px', width: 'auto' }} />
            </div>
          </Header>
          <Content style={{ padding: '50px 50px' }}>
            <h1>Pokemons list</h1>
            <Search
              placeholder="Start typing pokemon's name"
              onSearch={value => console.log(value)}
              style={{ width: '60%' }}
            />
            <p>There is {Pokemonjson.count} pokemons</p>
            <PokemonList />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made by Ann Ryzhankova. Delivered with love </Footer>
        </Layout>
      </Layout>

    </div>
  )
}

export default App
