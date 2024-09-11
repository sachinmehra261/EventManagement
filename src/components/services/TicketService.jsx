import axios from "axios";

let api = axios.create({
    baseURL: "http://localhost:9090",
  });

export const buyTicket = async (eventId,ticketType,quantity) => {
    const response = await fetch(`http://localhost:9090/ticket/buyTicket/${eventId}/${ticketType}/${quantity}`);
    let result = response.json();
    return result;
};


