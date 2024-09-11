import React, { useContext, useEffect, useState } from 'react'
import '../bookedtickets/bookedticket.css'
import { ValueContext } from '../context/Context'
function BookedTicket({order,setOrder}) {

    const{subTotal,setSubTotal} = useContext(ValueContext)
    

    let eventData = JSON.parse(localStorage.getItem('eventData'))

    useEffect(()=>{
        eventData?.tickets.map((ticket,index)=>{
           ticket?.count > 0 ? setOrder(ticket)  : 0;      
        })
    },[])
    
    useEffect(()=>{
        setSubTotal(order?.price * order?.count)
    })

    // let subTotal = order?.price * order?.count; 
    let convienceFee = subTotal * (5/100)

    let dateObj = new Date();
    let year = dateObj.getYear() + 1900;
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let newDate = new Date(year , month ,date);

    const formattedDate = newDate.toISOString().split('T')[0];       
    
  return (
    <>
    <div className="booked-ticket-main-container">
        <div className="booked-ticket-first-container">
            <div className="booked-ticket-description">
                <p id='ticket-order-summary-tagline'>Order Summary</p>
                <p id='booked-event-ticket-name'>{eventData?.eventName}</p>
                <p id='booked-ticket-type'>{order?.ticketType} (&#8377;{order?.price}): {order?.count} tickets </p>
                <p className='booked-ticket-date-time'>{formattedDate}</p>
                <p className='booked-ticket-date-time'>{hours % 12 + ':' + minutes + ' ' + (hours > 12 ? 'AM':'PM')}</p>
            </div>
            <div className="booked-ticket-quantity">
                <p>{order?.count} Tickets</p>
            </div>
        </div>
        <div className="booked-ticket-second-container">
            <p className='booked-ticket-subtotal-container second-cont-flex' ><span>Subtotal</span><span>&#8377;{subTotal}</span></p>
            <p className='convience-fee-container second-cont-flex'><span>Convience Fee</span><span>&#8377;{convienceFee}</span></p>
        </div>
            <div className="total-payable-amount-container second-cont-flex">
                <span>Total Payable Amount</span><span>&#8377;{subTotal+convienceFee}</span>
            </div>
    </div>
    </>
  )
}

export default BookedTicket
