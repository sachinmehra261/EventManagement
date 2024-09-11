import Register from "./components/users/register/Register";
import "./App.css";
import Home from "./components/pages/Home";
import EventPage from "./components/pages/EventPage";
import CalendarComp from "./components/calendar/CalendarComp";
import BookingDateTime from "./components/pages/BookingDateTime";
import BookTicket from "./components/pages/BookTicket";
import PaymentPage from "./components/pages/PaymentPage";
import { RouterProvider } from "react-router-dom";
import router from "./components/Route";
import { ValueProvider } from "./components/context/Context";

function App() {
  return (
    <>
      {/* <Register/> */}
      {/* <Home/> */}
      {/* <EventPage/> */}
      {/* <BookingDateTime/> */}
      {/* <BookTicket/> */}
      {/* <PaymentPage/> */}
      <ValueProvider>
        <RouterProvider router={router} />
      </ValueProvider>
    </>
  );
}

export default App;
