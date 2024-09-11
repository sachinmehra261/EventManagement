import React, { useEffect, useState } from 'react'
import '../section/section.css'
import EventCards from '../cards/eventcards/EventCards'
import { getAllEvents } from '../services/EventService'

function Section() {
  
  return (
    <>
      <div className="section-body-container">
        <div id='section-main-container'>
          <EventCards/>
        </div>
      </div>
    </>
  )
}

export default Section
