import React, { useContext, useEffect, useState } from 'react'
import '../myOrders/myorders.css'
import { getAllBookings } from '../services/BookingService';
import Navbar from '../navbar/Navbar';
import { getEventByTicketId } from '../services/EventService';
import { ValueContext } from '../context/Context';
import logo from '../../assets/images/logo.png'
import Loader from '../loader/Loader';

function MyOrder() {

    const{orderData,setOrderData,placedNewOrder,setPlacedNewOrder,isLoading,setIsLoading} = useContext(ValueContext)
    const [event,setEvent] = useState([])

    // let orderData = JSON.parse(localStorage.getItem('bookingData'))
    // console.log(orderData);
    let userId = localStorage.getItem('userId')

    
    const getEvent = async(ticketId) =>{
        let response = await getEventByTicketId(ticketId);
        setEvent((prev)=>[...prev,response])       
    }
    
    useEffect(()=>{
        if(placedNewOrder || orderData){
            const apiCall = async() =>{
                try {
                    let bookingResponse = await getAllBookings(userId)
                    setOrderData(bookingResponse) 
                    setIsLoading(false)
                    setPlacedNewOrder(false)
                } catch (error) {
                    console.log(error);
                }
            }
            apiCall();
        }else{
        }
        orderData.length ? orderData?.map((booking,index)=>{
            getEvent(booking?.ticket?.ticketId) 
        }) : ""
        return
    },[orderData,placedNewOrder,userId])

    let dateObj = new Date();
    let year = dateObj.getYear() + 1900;
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    
    function formatDate(bookingDate){
        if(bookingDate !=null){

            const [year,month,date] = bookingDate
            let newDate = new Date(year , month ,date);
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            const formattedDate = newDate.toLocaleDateString('en-US', options);
            return formattedDate;       
        }

    }

  return (
    <>
    {isLoading ? <Loader/> : ''}
    <Navbar/>
    <div className="orders-body-container">
                <h1 style={{textAlign:'center',padding:'10px'}}>{orderData?.length ? 'Order History' : 'No Order History' }</h1>
        <div className="orders-sub-container">
            {orderData?.length ? orderData?.map((booking,index)=>(
                <div className="order-container">
                <div id='order-section-1'>
                    <p>Order Id : {booking?.bookingId}</p>
                    <p>Ticket Id : {booking?.ticket?.ticketId}</p>
                    <p>Name : {booking?.user?.userName}</p>
                    <p>Ticket Type : {booking?.ticket?.ticketType}</p>
                    <p>Quantity : {booking?.quantity}</p>
                    <p>Booking Date : {formatDate(booking?.bookingDate)}</p>
                </div>
                <div id='order-section-2'>
                    <p>EventName : {event[index]?.eventName}</p>
                    <p>Location : {event[index]?.location}</p>
                    <p>Event Date : {formatDate(event[index]?.startDate)}</p>
                    <div id='logo-on-ticket-container'>
                    <span>
                        <img src={logo} alt="image" id='logo-on-ticket'/>
                    </span>
                    </div>
                </div>
            </div>
            )) : ""}
        </div>
    </div>
    </>
  )
}

export default MyOrder
