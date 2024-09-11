import React, { useEffect, useState } from "react";
import { addEvent, updateEvent } from "../services/EventService";
import '../addevent/addevent.css'
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const AddEvent = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [responseCode,setResponseCode] = useState()
  const [alertMessage,setAlertMessage] = useState('');

  const [tickets,setTicekts] = useState([{}])

  function handleAddTicket(){
    setTicekts((prev)=>[...prev,{ticketType:'',price:'',quantity:'',availableQuantity:''}])
  }

  function handleDeleteTicket(index){
    
    const newTickets = tickets.filter((ticket,i)=>{
      console.log(index,'index==i',i);
      return i !== index;
    })
    setTicekts(newTickets);
  }

  const handleTicketChange = (index,e) =>{
    const {name,value} = e.target;
    const newTickets = [...tickets]
    newTickets[index][name] = value
    setTicekts(newTickets)
  }

  
  let editedEvent = JSON.parse(localStorage.getItem('updateEvent'))
  if (params?.eventId) {
    useEffect(() => {
      if (editedEvent!=null) {
        setFormData({
          category: editedEvent?.category,
          eventName: editedEvent?.eventName,
          description: editedEvent?.description,
          startDate: formatDate(editedEvent?.startDate),
          endDate: formatDate(editedEvent?.endDate),
          location: editedEvent?.location,
          capacity: editedEvent?.capacity,
          image : editedEvent?.image
        });
      }
    }, [params?.eventId]);
  }

  useEffect(()=>{

  }),[responseCode]

  function formatDate(dateString) {
    
    // Split the date string into year, month, and day components
    const [year, month, day] = dateString;
  
    // Create a Date object
    const date = new Date(year, month - 1, day); // Month is 0-indexed
  
    // Format the date as yyyy-MM-dd
    const formattedDate = date.toISOString().split('T')[0];
  
    return formattedDate;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        data.append(key, formData[key]); // Append the file object
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append("tickets",JSON.stringify(tickets.map((ticket,index)=>({
      
      ticketType : ticket.ticketType,
      price : ticket.price,
      quantity : ticket.quantity
    }))))

    // console.log(formData,"FormDATAA+++++++++++++++++");
    // console.log(data,'DAATAAAAaaaaa');
    
    
    params?.eventId == null ? setAlertMessage('Event Saved Succefully'):setAlertMessage('Event Updated Successfully')

    if(params?.eventId == null){
      try {
        let userId = localStorage.getItem('userId')
        let result = await addEvent(userId,data);
        // console.log(data);
        
        // console.log(result.status,'KKKKKKKKKKKKKKKKKKKKKKKKKKKK');
        setResponseCode(result?.status)
      } catch (error) {
        console.error("Error:", error);
      }
    }else{
      try {
        let userId = localStorage.getItem('userId')
        let result = await updateEvent(userId,params?.eventId,data);
        setResponseCode(result?.status)
        localStorage.removeItem('updateEvent')
        setTimeout(()=>{
          navigate('/addEvent')
        },1000)
      } catch (error) {
        console.error("Error:", error);
      }
    }


    setTimeout(()=>{
      setAlertMessage('')
    },1000)
    
  };

  return (
    <div className="add-event-form-container">
      <h1>{params?.eventId == null ? 'Create Event' : 'Update Event'}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={formData.category || ''} onChange={handleChange} required>
          <option>Please Select Category</option>
          <option value="Music">Music</option>
          <option value="Comedy">Comedy</option>
          <option value="Education">Education</option>
          <option value="Science">Science</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Dance">Dance</option>
        </select>

        <label htmlFor="eventName">Event Name:</label>
        <input type="text" id="eventName" name="eventName" value={formData.eventName || ''} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} required></textarea>

        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate || ''} onChange={handleChange} required />

        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" value={formData.endDate || ''} onChange={handleChange} required />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleChange} required />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" name="capacity" value={formData.capacity || ''} onChange={handleChange} required />

        <label htmlFor="image">Event Image:</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} required/>
        {imagePreview && <img src={imagePreview} alt="Event Preview" className="image-preview" />}


      {/* //Tickets */}

      {tickets?.map((ticket,index)=>(
        <>
        <div id="delete-ticket-icon-container">
          <label htmlFor="ticketType">Ticket Type {index+1}</label>
          <MdDeleteForever id="delete-ticket-icon" onClick={()=>handleDeleteTicket(index)}/>
        </div>
          <select name="ticketType" id="ticketType" onChange={(e)=>handleTicketChange(index,e)}>
            <option>Select Ticket Type</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
          </select>

          <label htmlFor="ticket-price">Ticket Price</label>
          <input type="number" name="price" id="ticket-price" onChange={(e)=>handleTicketChange(index,e)}/>

          <label htmlFor="ticket-price">Quantity</label>
          <input type="number" name="quantity" id="ticket-quantity" onChange={(e)=>handleTicketChange(index,e)}/>
          <br />
        </>
      ))}
        <button onClick={handleAddTicket} className="add-ticket-event-btn">Add Ticket</button>
        {responseCode == 200 ? <p style={{color:'green',textAlign:'center',padding:'10px'}}>{alertMessage}</p> : null}
        <button type="submit" id="add-event-submit-btn" className="add-ticket-event-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;
