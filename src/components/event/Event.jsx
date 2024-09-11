import React, { useContext, useEffect, useState } from "react";
import eventImg from "../../assets/images/event.jpg";
import "../event/event.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByEventid } from "../services/EventService";
import { ValueContext } from "../context/Context";

function Event() {

  const {eventData,setEventData} = useContext(ValueContext)
  const [isAvailable,setIsAvailable] = useState();

  const navigate = useNavigate();
  const params = useParams({})
  


  const apiCall = async() =>{
    let response = await getEventByEventid(params.eventId)
    localStorage.setItem('eventData',JSON.stringify(response))
    
    setEventData(response)    
  }

  useEffect(()=>{
    apiCall();
  },[])  

  function handleClick(){
    navigate(`/bookticket/${eventData?.eventName}`)
  }

  // console.log(eventData?.tickets[0].availableQuantity!==0,'isAvailable');

  useEffect(()=>{

    let arr = eventData?.tickets.filter((ticket)=>{
      return ticket.availableQuantity !==0
    })

    arr?.length != 0 ? setIsAvailable(true) : setIsAvailable(false);
    
    

    // const l = eventData?.tickets.map((ticket)=>{
    //   console.log(ticket.availableQuantity,'mainnnnnnnnnnnnnn');
      
    //   if(ticket.availableQuantity!== 0){
    //     console.log(ticket.availableQuantity,'ANDAR');
        
    //     setIsAvailable(ticket.availableQuantity)
    //     localStorage.setItem('isTicketAvailable',ticket.availableQuantity)
    //     return "return"
    //   }
    // })
    // console.log('bhar',l);

  },[eventData?.tickets[0]?.ticketId])
  
  

  return (
    <>
      <div className="event-main-container">
        <div className="event-sub-container">
          <div className="event-img">
            <img src={`data:image/jpeg;base64,${eventData?.image}`} alt="" />
          </div>
          <div className="event-main-detail-container">
            <div className="event-detail-sub-container">
              <p className="event-name">{eventData?.eventName}</p>
              <p>English | 21yrs+ | 5hrs</p>
            </div>
            <button id={isAvailable ? "event-book-btn" : "event-book-btn-disabled" } onClick={ isAvailable ? handleClick : null}>{ isAvailable ? 'Book' : 'Unavailable' }</button>
          </div>
          <hr />
          <div className="event-sub-detail-container">
            <span>{eventData?.startDate} - {eventData?.endDate} | </span>
            <span>{<FaLocationDot id="loc-icon" />} Location {eventData?.location} | </span>
            <span id="price-tag">&#8377; {isAvailable ? eventData?.tickets[0]?.price + ' Onwards' : 'unavailable' } </span>
          </div>
          <hr />
        </div>
        <div id="event-description-main-container">
          <div className="event-description-sub-container">
            <p id="event-desc-title">About</p>
            <p id="event-description">
              {eventData?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
