import React from 'react'
import logo from '../pictures/logo.png'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import PokemonList from './PokemonsList'
import Filter from './Filter'
import { PokemonProvider } from "../stores/PokemonProvider";

// const {CheckableTag} = Tag;

const { Header, Footer, Content } = Layout

function App() {
  return (
    <div className='App'>
      <Layout>
        <Layout>
          <Header>
            <div className='logo'>
              <img src={logo} style={{ height: '48px', width: 'auto' }} alt='logo' />
            </div>
          </Header>
          <Content style={{ padding: '50px 60px' }}>
            <h1>Pokemons list</h1>
            <PokemonProvider>
            <Filter />
              <PokemonList />
            </PokemonProvider>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made by Ann Ryzhankova. Delivered with love </Footer>
        </Layout>
      </Layout>

    </div>
  )
}

export default App