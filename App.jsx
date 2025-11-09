import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AddItem from './components/AddItem'
import ItemsBoard from './components/ItemsBoard'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <h1>EcoExchange</h1>
        <nav>
          <Link to="/">Items</Link>
          <Link to="/add" style={{marginLeft:12}}>Add Item</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<ItemsBoard />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </main>

      <footer className="footer">Built for CodeXcelerate Internship</footer>
    </div>
  )
}
