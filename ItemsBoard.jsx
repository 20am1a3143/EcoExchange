import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function ItemsBoard(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [condition, setCondition] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchItems = async () =>{
    setLoading(true)
    try{
      const params = new URLSearchParams()
      if (q) params.append('q', q)
      if (condition) params.append('condition', condition)
      if (location) params.append('location', location)
      if (status) params.append('status', status)

      const res = await fetch(`${API}/items?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setItems(data)
    }catch(err){ console.error(err) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchItems() }, [])

  const handleSearch = (e) => { e.preventDefault(); fetchItems() }

  const handleToggle = async (item) => {
    const newStatus = item.status === 'available' ? 'exchanged' : 'available'
    try{
      const res = await fetch(`${API}/items/${item._id}`, {
        method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ status: newStatus })
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>null)
        throw new Error(err?.message || 'Failed to update')
      }
      const updated = await res.json()
      setItems(prev => prev.map(i => i._id === updated._id ? updated : i))
    }catch(err){ alert('Could not update status: ' + err.message) }
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={handleSearch} style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <input placeholder="Search name or description" value={q} onChange={e=>setQ(e.target.value)} className="input" style={{flex:1}} />
          <select value={condition} onChange={e=>setCondition(e.target.value)} className="input" style={{width:160}}>
            <option value="">All Conditions</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Acceptable</option>
          </select>
          <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} className="input" style={{width:140}} />
          <select value={status} onChange={e=>setStatus(e.target.value)} className="input" style={{width:140}}>
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="exchanged">Exchanged</option>
          </select>
          <button className="btn">Search</button>
        </form>
      </div>

      <div style={{marginTop:12}}>
        { loading ? <div className="card small">Loading...</div> : (
          items.length ? (
            <div className="items-grid">
              {items.map(item => <ItemCard key={item._id} item={item} onToggle={handleToggle} />)}
            </div>
          ) : (
            <div className="card small">No items found — try adding some!</div>
          )
        )}
      </div>
    </div>
  )
}
