import React from "react";
import "../eventcard/eventcard.css";
import eventImg from "../../../assets/images/event.jpg";
import { useNavigate } from "react-router-dom";

function EventCard({event}) {

  const navigate = useNavigate();

  function handleClick(){
    navigate(`/event/${event.eventId}`)
  }
  
  return (
    <>
      <div className="event-card-main-container">
        <div className="event-card-sub-container" onClick={handleClick}>
          <div className="card-image">
            <img src={`data:image/jpeg;base64,${event?.image}`} alt="" height="70px" />
          </div>
          <div className="event-card-content">
            <p id="event-name">{event.eventName}</p>
            <p id="event-location">{event.location}</p>
            <p id="event-price">&#8377; {event?.tickets[0]?.price} Onwards</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCard;
