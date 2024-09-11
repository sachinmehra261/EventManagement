import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Tickets from "../ticket/Tickets";
import { useNavigate } from "react-router-dom";

function BookTicket() {
  const navigate = useNavigate();
  const [countOfTicket,setCountOfTicket] = useState(0)
  

  function handleClick() {
    navigate("/paymentpage");
  }

  return (
    <>
      <Navbar />
      <Tickets setCountOfTicket={setCountOfTicket}/>
      <div id="proceed-to-ticket-btn-container">
        <button id= {countOfTicket > 0 ? 'proceed-to-ticket-btn' : 'proceed-to-ticket-btn-disabled'} onClick={countOfTicket > 0 ? handleClick : null }>Proceed</button>
      </div>
    </>
  );
}

export default BookTicket;
