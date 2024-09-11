import React from "react";
import AddEvent from "../addevent/AddEvent";
import ShowEventByUser from "../showeventsbyuser/ShowEventByUser";
import Navbar from '../navbar/Navbar'

function AddEventPage() {
  return (
    <>
    <Navbar/>
      <div style={{display:'flex',justifyContent:'space-evenly',backgroundColor:'#E7F0DC'}}>
        <AddEvent />
        <ShowEventByUser />
      </div>
    </>
  );
}

export default AddEventPage;
