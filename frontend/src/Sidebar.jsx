import React, { useState,useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import dashboardIcon from './icons/dashboard.json'
import TicketCard from './TicketCard'
import ProductCard from './ProductCard'
import ProductTable from "./ProductTable"

const navItems = [
  { label: "Dashboard",        emoji: "🏴‍☠️"},
  { label: "Products",         icon: null, emoji: "📦" },
  { label: "ticket ",          icon: null, emoji: "🎫" },
  { label: "Seller Tools",     icon: null, emoji: "👥" },
  { label: "My Store",         icon: null, emoji: "🏪" },
  { label: "Report",           icon: null, emoji: "📊" },
  { label: "Support",          icon: null, emoji: "🎧" },
  { label: "Finance",          icon: null, emoji: "💼" },
  { label: "Referrals",        icon: null, emoji: "🔗" },
  { label: "Settings",         icon: null, emoji: "⚙️" },
]

const profile = [
  "Sign in",
  "Sign out",
  "settings"
]


export default function Sidebar() {
const [count,setCount]=useState(0);
const increase= ()=>
{
  setCount(count+1);
}
const degrease=()=>{
  setCount(count-1);
}

const bgcolor = ()=>
{
  if(count % 2 == 0)
  {
    return "bg-blue-100"
  }
  else{
    return "bg-green-100"
  }
}
  const[profile,setProfile] = useState("settings")
  const [a,setA] = useState(3)
  const [b,setB] = useState(5)

  const [sum,setSum] = useState(0);
  const [multi,setMulti] = useState(0);

  const [reset,setReset] = useState(0);
  const rest =()=>
  {
    setCount(0)
  }

  const [tab,setTab] = useState("Dashboard");
  return (
    <div className='flex flex-row'>
      
      <div className="flex flex-col justify-between h-screen w-56 bg-white border border-gray-200 px-4 py-6">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-xl">🌸</span>
          <span className="text-lg font-bold tracking-tight">ecom</span>
        </div>

        <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            onClick={() => setTab(item.label)}
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${tab === item.label
                ? "bg-gray-100 font-semibold text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      </div>

      <div className="flex items-center gap-3 px-2">
        <img
          src='https://www.w3schools.com/howto/img_avatar.png'
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-800">Devid Mil</span>
        <select>
          <option value="">profile</option>
          <option value="">settings</option>
          <option value="">sign in</option>
        </select>
        <span className="ml-auto text-gray-400 text-xs">▾</span>
      </div>

      
    </div>
          
      {/* <div className={`flex-1 border border-gray-200 ${bgcolor()}`}>
      <div className='border rounded-full p-8 bg-blue-500'>

      </div>
        <h1 className='text-5xl text-center'>Welcome</h1>

        

       {/* <p className='m-8'>sum:{sum}</p>
       <p className='m-8'>muti:{multi}</p> */}

       {/* <button className='border m-8 p-4 ' onClick={()=> setSum(a+b)}>Sum</button> */}
       {/* <button className='border m-8 p-4' onClick={()=>setCount(count+1)}>Count+</button> */}
       
      {/* <div className='flex justify-center'>
      <button className='border rounded-full m-8 p-4' onClick={degrease}>-</button>
      <p className='m-8 border rounded-full p-4'>{count}</p>
      <button className='border m-8 p-4 rounded-full' onClick={increase}>+</button>
       
      </div>
      <div className='text-center'>
              <button className='border rounded-xl p-2' onClick={rest}>reset</button>
      </div> */} 
       {/* <button className='border m-8 p-4' onClick={()=>setMulti(a*b)}>Multi</button>
       <button className='border m-8 p-4' onClick={()=>setMulti(setCount(count+a*b))}>Multi_into</button>
         */}

      {/* </div> */}

        <div className=' border w-full'>
          <div className='border m-8 p-4'>
            <h2 className='text-4xl '>Ticket Info</h2>
            <ProductTable/>
            {/* <ProductCard /> */}
            {/* <TicketCard/> */}
        </div>
    </div>
    </div>
  )
}
