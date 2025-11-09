import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AddItem(){
  const [form, setForm] = useState({ name:'', image:'', condition:'Good', location:'', description:'' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res = await fetch(`${API}/items`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>null);
        throw new Error(err?.message || 'Failed to add item')
      }
      await res.json()
      navigate('/')
    }catch(err){
      alert('Error adding item: ' + err.message)
    }finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="small">Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="input" />
        </div>

        <div className="form-row">
          <label className="small">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="input" placeholder="https://..." />
        </div>

        <div className="form-row">
          <label className="small">Condition</label>
          <select name="condition" value={form.condition} onChange={handleChange} className="input">
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Acceptable</option>
          </select>
        </div>

        <div className="form-row">
          <label className="small">Location</label>
          <input name="location" required value={form.location} onChange={handleChange} className="input" />
        </div>

        <div className="form-row">
          <label className="small">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input" />
        </div>

        <button className="btn" disabled={loading}>{ loading ? 'Adding...' : 'Add Item' }</button>
      </form>
    </div>
  )
}
