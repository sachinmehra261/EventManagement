import React, { useEffect } from 'react';
import './ticket.css';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';

function Ticket({ index, eventData, ticketCount, onTicketCountChange, setCountOfTicket }) {

    function handleRemoveTicket() {
        if (ticketCount > 0) {
            onTicketCountChange(index, ticketCount - 1);
        }
    }

    function handleAddTicket() {
      if(ticketCount < 10){
        onTicketCountChange(index, ticketCount + 1);
      }
    }

    useEffect(()=>{
      setCountOfTicket(ticketCount)
    },[ticketCount,index])

    return (
      <>
        <div className="ticket-main-container">
            <div className="ticket-detail-sub-container">
                <p className="ticket-name">{eventData?.eventName}</p>
                <p>{eventData?.tickets[index]?.ticketType}</p>
                <p id="ticket-price">&#8377;{eventData?.tickets[index].price}</p>
            </div>
            <div id="ticket-add-remove-container">
            {ticketCount == 0 ? <button id='add-button-ticket' onClick={handleAddTicket}>Add</button> :
               <><p id="remove-ticket" onClick={handleRemoveTicket}>
                    <IoMdRemoveCircle />
                </p>
                <span>{ticketCount}</span>
                <p id="add-ticket" onClick={handleAddTicket}>
                    <IoMdAddCircle />
                </p></>}
            </div>
        </div>
      </>
    );
}

export default Ticket;
