import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../calendar/calendarcomp.css'
import { useNavigate } from 'react-router-dom';

function CalendarComp() {
  
  const[value,setValue] = useState()
  const [selectTime,setSelectTime] = useState(false)
  const navigate = useNavigate();
  function handleClick(){
    navigate('/bookticket')
  }

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date = new Date();
  
  return (
    <>
    <div className="calendar-main-container">
      <div id='calendar-container'>
          <Calendar onChange={(e)=>setValue(e)}/>
          <p id='date-info'>{value ? weekday[value.getDay()] +','+value.getDate() + ' ' + month[value.getMonth()] : weekday[date.getDay()] +','+date.getDate() + ' ' + month[date.getMonth()]}</p>
          <button className = {selectTime ? 'time-btn-active' : 'time-btn-inactive'} onClick={()=>{setSelectTime(!selectTime)}}>8:30 A.M</button>
      </div>
      {
        value && selectTime ? 
      <div id='proceed-to-ticket-btn-container'>
        <button id='proceed-to-ticket-btn' onClick={handleClick}>Proceed</button>
      </div> : '' }
    </div>
    </>
  )
}

export default CalendarComp
