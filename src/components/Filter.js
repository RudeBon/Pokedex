import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Input, Select } from 'antd'

const { Search } = Input
const { Option } = Select

export default function Filter () {
  const [types, setTypes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const url = 'https://pokeapi.co/api/v2/type'

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTypes(data.results)
      })
  }, [])

  const children = []
  types.forEach(type => children.push(<Option key={type.name}>{type.name}</Option>))

  function handleChangeSelect (value) {
    // setSelectedTags(prev => prev.push(value))
    console.log(`selected ${value}`)
    console.log(`set selected ${selectedTags}`)
  }

  return (
    <div>
      <Search
        placeholder="Start typing pokemon's name"
        onSearch={value => console.log(value)}
        style={{ width: '50%', minWidth: '300px' }}
      />
      <Select
        mode='multiple'
        allowClear
        placeholder='Select pokemon type (multiple options)'
        onChange={handleChangeSelect}
        style={{ width: '50%', minWidth: '300px' }}
      >
        {children}
      </Select>
    </div>

  )
}
