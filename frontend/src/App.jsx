import React, { useState,useEffect } from 'react'
import axios from "axios";
import Sidebar from './Sidebar'
import TicketCard from './TicketCard';
import ProductCard from './ProductCard';
import ProductTable from "./ProductTable";
import Login from "./Login"

const tabs = [
  "Basic Information",
  "Vital Information",
  "Variations and Price",
  "Image",
  "Descriptions",
  "Shipping & Returns",
]

function App() {
  const [activeTab, setActiveTab] = useState("Basic Information")
  const [title,setTitle] = useState('Basic Information')



  return (
    <div className="min-h-screen p-6 ">
      {/* <Sidebar /> */}
      <Login />
      
    
      
      {/* <div className="mx-auto flex w-full max-w-6xl gap-4">
        

        <div className="flex-1 border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-5">
            <h3 className="text-2xl font-semibold text-gray-900">Add new product</h3>
            <h4 className="mt-1 text-sm text-gray-500">
              Products <span className="mx-1">/</span>
              <span className="text-gray-900">Add new product</span>
            </h4>
          </div>

          <div className="border-b border-gray-200 px-6">
            <div className="flex flex-wrap gap-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {setActiveTab(tab),setTitle(tab)}}
                  className={`relative px-3 py-3 text-sm whitespace-nowrap ${
                    activeTab === tab
                      ? 'font-semibold text-gray-900'
                      : 'font-normal text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 p-4 md:p-6">
              <h3 className="mb-5 text-3xl font-semibold text-gray-900">{activeTab}</h3>

              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-800">Shipping method</label>
                <select
                  id="shippingMethod"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Standard shipping: small to medium items</option>
                </select>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-gray-700">Package weight (kg)</p>
                  <input type="number" defaultValue="0.5" className="w-full rounded-lg border border-gray-300 p-3" />
                </div>
                <div>
                  <p className="mb-2 text-gray-700">Package dimensions (cm)</p>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Length" className="rounded-lg border border-gray-300 p-3" />
                    <input type="text" placeholder="Width" className="rounded-lg border border-gray-300 p-3" />
                    <input type="text" placeholder="Hight" className="rounded-lg border border-gray-300 p-3" />
                  </div>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-300 p-3">
                <input id="freeShipping" type="checkbox" className="h-4 w-4" />
                <label htmlFor="freeShipping" className="font-medium text-gray-800">Offer free shipping</label>
              </div>

              <div className="mb-4">
                <h3 className="mb-3 text-3xl font-semibold text-gray-900">Return policy</h3>
                <label className="mb-2 block font-semibold text-gray-800" htmlFor="returnPolicy">
                  Return
                </label>
                <select
                  id="returnPolicy"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Free and easy returns</option>
                </select>
                <p className="mt-3 text-sm text-gray-500">
                  You have 15 days from the date your order is shipped to request a prepaid return shipping label online.
                  Visit our <span className="underline">FAQ</span> for our full return policy.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2">Save Draft</button>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2">Preview</button>
                  <button className="rounded-lg bg-black px-4 py-2 text-white">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      
    </div>
  )
}

export default App


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); 

//     axios
//       .get("http://localhost:5001/api/tickets", {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data.tickets); 
//         setTickets(res.data.data.tickets);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>All Tickets</h1>

//       {tickets.length === 0 ? (
//         <p>No tickets found</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//           {tickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "15px",
//                 borderRadius: "10px",
//                 width: "300px",
//                 background: "#f9f9f9",
//               }}
//             >
//               <h2>{ticket.title}</h2>
//               <p>{ticket.description}</p>
//               <p>Status: {ticket.status}</p>
//               <p>Priority: {ticket.priority}</p>
//               <p>User: {ticket.createdBy?.name}</p>
//               <p>
//                 Tags: {ticket.tags.length > 0
//                   ? ticket.tags.join(", ")
//                   : "No tags"}
//               </p>
//               <p>{new Date(ticket.createdAt).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;