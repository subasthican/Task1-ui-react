import React,{useState,useEffect} from 'react'
import axios from "axios";
function TicketCard() {

      const [tickets, setTickets] = useState([]);

useEffect(() => {
    const token = localStorage.getItem("token"); 

    axios
      .get("http://localhost:5001/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => {
        console.log(res.data.data.tickets); 
        setTickets(res.data.data.tickets);
      })
      .catch((err) => console.log(err));
  }, []);




  return (
    <div>
        <div  className="p-5">
      <h1 className='p-4'>All Tickets</h1>

        {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <div className="flex warp gap-4 flex flex-col ">
          {tickets.map((ticket) => (
            <div className='border p-4 rounded-2xl bg-gray-200 '
              key={ticket._id}
            >
              <h2 >title:{ticket.title}</h2>
              <p>description:{ticket.description}</p>
              <p>Status: {ticket.status}</p>
              <p>Priority: {ticket.priority}</p>
              <p>User: {ticket.createdBy?.name}</p>
              <p>
                Tags: {ticket.tags.length > 0
                  ? ticket.tags.join(", ")
                  : "No tags"}
              </p>
              <p>{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div></div>
  )
}

export default TicketCard