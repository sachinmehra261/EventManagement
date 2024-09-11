import React, { useEffect, useState } from "react";
import { deleteEventByUserId, getAllEventsByUserId } from "../services/EventService";
import '../showeventsbyuser/showeventbyuser.css'
import { useNavigate } from "react-router-dom";

function ShowEventByUser() {

    const navigate = useNavigate();

    const[userEvents,setUserEvents] = useState()
    const[isEventDeleted,setIsEventDeleted] = useState()

    const apiCall = async()=>{
        let userId = localStorage.getItem('userId')
        let result = await getAllEventsByUserId(userId)
        setUserEvents(result) 
    }

    useEffect(()=>{
        apiCall();
    },[userEvents])

    const handleDeleteEvent = async(e) =>{
        let result = await deleteEventByUserId(e);   
        setIsEventDeleted(result)
    }

    const handleUpdateEvent = (e) =>{
      localStorage.setItem('updateEvent',JSON.stringify(e))
      navigate(`/updateEvent/${e?.eventId}`)
    }

    function formatDate(dateString) {
    
      // Split the date string into year, month, and day components
      const [year, month, day] = dateString;
    
      // Create a Date object
      const date = new Date(year, month - 1, day); // Month is 0-indexed
    
      // Format the date as yyyy-MM-dd
      const formattedDate = date.toISOString().split('T')[0];
    
      return formattedDate;
    }

  return (
    <>
    <div style={{paddingTop:'60px'}}>

      <table border={1}>
        <thead>
        <tr>
          <th>Category</th>
          <th>EventName</th>
          <th>Location</th>
          <th>StartDate</th>
          <th>End Date</th>
          <th>Capacity</th>
          {/* <th>Description</th> */}
          <th colSpan={2}>Action</th>
        </tr>
        </thead>
        <tbody>
        { userEvents?.map((event,index)=>(
            <tr aria-rowspan={2} key={index}>
                <td>{event?.category}</td>
                <td>{event?.eventName}</td>
                <td>{event?.location}</td>
                <td>{formatDate(event?.startDate)}</td>
                <td>{formatDate(event?.endDate)}</td>
                <td>{event?.capacity}</td>
                {/* <td>{event?.description}</td> */}
                <td onClick={()=>handleUpdateEvent(event)} ><button id="event-edit-btn">Edit</button></td>
                <td onClick={() => handleDeleteEvent(event.eventId)}><button id="event-delete-btn">Delete</button></td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default ShowEventByUser;
