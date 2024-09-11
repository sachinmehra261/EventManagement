import { createContext, useState } from "react";

const ValueContext = createContext();

const ValueProvider = ({ children }) => {
  const [eventData,setEventData] = useState()
  const[ticketCount,setTicketCount] = useState(0)
  const[subTotal,setSubTotal] = useState(0)
  const [orderData,setOrderData] = useState([])
  const [placedNewOrder,setPlacedNewOrder] = useState(true)
  const [isLoading,setIsLoading] = useState(true);

  return (
    <ValueContext.Provider value={{ eventData, setEventData, ticketCount,setTicketCount,subTotal,setSubTotal,orderData,setOrderData,placedNewOrder,setPlacedNewOrder,isLoading,setIsLoading }}>
      {children}
    </ValueContext.Provider>
  );
};

export { ValueContext, ValueProvider };
