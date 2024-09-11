import React, { useContext, useEffect, useState } from "react";
import "../eventcards/eventcards.css";
import EventCard from "../eventcard/EventCard";
import { getAllEvents, getEventByCategory } from "../../services/EventService";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { ValueContext } from "../../context/Context";
function EventCards() {

  const{isLoading,setIsLoading} = useContext(ValueContext)
  const [eventsData,setEventsData] = useState([])
  const params = useParams();

  // console.log(params?.category!=null);
  useEffect(()=>{
    setIsLoading(true)
    if(params?.category != null){
      (async()=>{
        let result = await getEventByCategory(params?.category);
        setEventsData(result)
        setIsLoading(false)
      })()
    }else{
      (async()=>{
        let result = await getAllEvents();
        setEventsData(result)
        setIsLoading(false)
      })()
    }
    console.log('har bar');
    
  },[params])
  
  // const apiCall = async()=>{
  //   setEventsData(result)
  // }
  // useEffect(()=>{
  //   apiCall()
  // },[])

  // console.log(eventsData);
  


  return (
    <>
      <div id="event-cards-main-container-with-heading">
        <h1 id="event-cards-category">{params?.category ?  params?.category : 'All Events'}</h1>
        <div
          className="event-cards-main-container"
          style={{ display: "flex",flexWrap:'wrap', gap: "35px"}}
        >
          {
            eventsData?.map((event,index)=>(
              <EventCard key={index} event={event}/>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default EventCards;
