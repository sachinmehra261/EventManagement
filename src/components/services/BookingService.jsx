import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:9090",
});

export const saveBookingTicket = async(userId,ticketId,bookingData)=>{
  try {
    let response = await api.post(`booking/${userId}/${ticketId}`,bookingData)
    return response;
  } catch (error) {
    console.log(error.message);
    
  }
}
export const getAllBookings = async(userId)=>{
   let response = await fetch(`http://localhost:9090/getAllBookings/${userId}`)
      //  console.log(response,'BOKING RESPONSEEEEEEEEEEEe');
      let result = response.json()
    return result;
}