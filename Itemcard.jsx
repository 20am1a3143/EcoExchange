import React from 'react'

export default function ItemCard({ item, onToggle }){
  return (
    <div className="card">
      { item.image ? <img src={item.image} alt={item.name} className="item-image"/> : <div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',background:'#fafafa',borderRadius:6}}>No Image</div> }
      <h3>{item.name}</h3>
      <div className="small">{item.condition} • {item.location}</div>
      <p className="small">{item.description}</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <div className={item.status === 'available' ? 'toggle-available' : 'toggle-exchanged'}>{item.status}</div>
        <button className="btn" onClick={() => onToggle(item)}>{ item.status === 'available' ? 'Mark Exchanged' : 'Mark Available' }</button>
      </div>
    </div>
  )
}
