import React, { useContext } from 'react';
import Ticket from './Ticket';
import './ticket.css';
import { ValueContext } from '../context/Context';

function TicketContainer({setCountOfTicket}) {
    const { eventData, setEventData } = useContext(ValueContext);

    function handleTicketCountChange(index, count) {
        // Set the selected ticket count to the new count and reset others to 0
        const updatedTickets = localEventData?.tickets.map((ticket, i) => ({
            ...ticket,
            count: i === index ? count : 0,
        }));

        // Update the context with the new ticket counts
        setEventData({ ...eventData, tickets: updatedTickets });
    }

    if (eventData!=null) {
        localStorage.setItem('eventData',JSON.stringify(eventData))
    }
    let localEventData = JSON.parse(localStorage.getItem('eventData'))
    
    return (
        <div className="ticket-page-background-container">
        <h1 style={{textAlign:'center',padding:'10px'}}>Select Ticket</h1>
            {localEventData?.tickets.map((ticket, index) => (
                <Ticket
                    key={index}
                    index={index}
                    eventData={localEventData}
                    ticketCount={ticket.count || 0} // use the count property from eventData
                    onTicketCountChange={handleTicketCountChange}
                    setCountOfTicket={setCountOfTicket}
                />
            ))}
        </div>
    );
}

export default TicketContainer;
