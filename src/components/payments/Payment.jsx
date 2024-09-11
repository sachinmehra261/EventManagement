import React, { useContext, useEffect, useState } from "react";
import "../payments/payment.css";
import { useNavigate } from "react-router-dom";
import { buyTicket } from "../services/TicketService";
import { getAllBookings, saveBookingTicket } from "../services/BookingService";
import { ValueContext } from "../context/Context";
function Payment({order}) {

    const {placedNewOrder,setPlacedNewOrder} = useContext(ValueContext)

    const[isPaymentMethod,setIsPaymentMethod] = useState()
    const[cardPayment,setCardPayment] = useState(false)
    const navigate = useNavigate()

    const [bookingData,setBookingData] = useState()

    let dateObj = new Date();
    let year = dateObj.getYear() + 1900;
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let newDate = new Date(year , month ,date);
    const formattedDate = newDate.toISOString().split('T')[0];    

    useEffect(()=>{
      setBookingData({quantity : order?.count ,bookingDate : formattedDate })
    },[order?.count])
 
    // console.log("ORDERRRRRrrr",order);
    // console.log("ORDERRRRRrrrCounttttttttttt",order?.count);
    
    let eventData = JSON.parse(localStorage.getItem('eventData'))
    let userId = localStorage.getItem('userId')
    
    const handlePayment = async() => {
       let response =await buyTicket(eventData?.eventId,order?.ticketType,order?.count)
      //  console.log(response,"RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEeeeeee");
       if(!response){
        alert("Not Enough Tickets Available!")
        return;
       }else{
        setPlacedNewOrder(true)
        alert("Tickets Booked Successfully")
        setTimeout(()=>{
          navigate('/')
        },1000)
        
        let response = await saveBookingTicket(userId,order?.ticketId,bookingData)
        // console.log(response,"TODAYRESPONSEEEEEEEEEEEEEEEEEE");        

        let bookingResponse = await getAllBookings(userId)
        // console.log(bookingResponse,"BOKININININI");
        localStorage.setItem('bookingData',JSON.stringify(bookingResponse))
       }
       
    }

    function handleUpi(){
        setCardPayment(false)
    }
    function handleCard(){
        setCardPayment(true)
    }

  return (
    <>
      <div className="payment-main-container">
        <p id="payment-form-header">Choose Payment Options</p>
        <div className="payment-methods">
          <label htmlFor="upi-payment" onClick={handleUpi}>
            <div id="payment-method1">
              <input type="radio" name="payment" id="upi-payment" onClick={()=>setIsPaymentMethod(true)}/>
              <span> Pay By Upi</span>
            </div>
          </label>
          <label htmlFor="card-payment">
            <div id="payment-method2">
              <input type="radio" name="payment" id="card-payment" onChange={handleCard} onClick={()=>setIsPaymentMethod(true)}/>
              <span> Pay By Card</span>
            </div>
          </label>
          {cardPayment ? 
            <div id="payment-card-container">
            <div id="payment-card-sub-container">
                <input type="number" name="" id="" placeholder="Enter your Card Number" maxLength={12}/>
                <input type="number" name="" id="" placeholder="Name on Card" max/>
                <div>
                    <div>
                        <input type="number" name="" id="" placeholder="MM"/>
                        <input type="number" name="" id="" placeholder="YY"/>
                    </div>
                    <input type="number" name="" id="" placeholder="CVV"/>
                </div>
            </div>
          </div> : ''
          }
          {isPaymentMethod ? 
        <div id="proceed-to-pay-btn" onClick={handlePayment}>
            <p>Proceed To Pay</p>
        </div> : 
        <div id="proceed-to-pay-btn" style={{backgroundColor:'#d2d2d2'}}>
            <p>Proceed To Pay</p>
        </div>
          }
        </div>
      </div>
    </>
  );
}

export default Payment;
