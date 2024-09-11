import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:9090",
});
export const getAllEvents = async () => {
  const response = await fetch("http://localhost:9090/event/getAllEvents");
  let result = await response.json();
  return result.data;
};

export const getEventByEventid = async (eventId) => {
  const response = await fetch(
    `http://localhost:9090/event/getEventByEventId/${eventId}`
  );
  let result = await response.json();
  return result;
};

export const getEventByCategory = async (category) => {
  const response = await fetch(
    `http://localhost:9090/event/getAllEventsByCategory/${category}`
  );
  let result = response.json();
  // console.log(result);
  return result;
};
export const getEventCategories = async () => {
  const response = await fetch(`http://localhost:9090/event/getCategories`);
  let result = response.json();
  return result;
};

export const getAllEventsByUserId = async (userId) => {
  const response = await fetch(`http://localhost:9090/event/getAllEventsByUserId/${userId}`);
  let result = response.json();
  return result;
};
export const deleteEventByUserId = async (userId) => {
  const response = await fetch(`http://localhost:9090/event/deleteEventById/${userId}`,{ method:'DELETE' });
  let result = response.json();
  return result;
};

export const addEvent = async (userId,formData) => {
  try {    
    let response = await api.post(`event/saveEventByUserId/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    console.error("Error:", e.response ? e.response.data : e.message);
  }
};
export const updateEvent = async (userId,eventId,formData) => {
  try {
    let response = await api.put(`event/updateEventById/${userId}/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    console.error("Error:", e.response ? e.response.data : e.message);
  }
};

export const getEventByTicketId=async(ticketId)=>{
  const response = await fetch(`http://localhost:9090/event/getEventByTicketId/${ticketId}`);
  let result = response.json();
  return result;
}
