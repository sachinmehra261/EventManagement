import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../components/pages/Home";
import EventPage from "./pages/EventPage";
import BookingDateTime from "./pages/BookingDateTime";
import BookTicket from "./pages/BookTicket";
import PaymentPage from "./pages/PaymentPage";
import Register from './users/register/Register'
import AddEventPage from "./pages/AddEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import MyOrder from "./myOrders/MyOrder";

function Layout(){
    return(
        <>
            <Outlet/>
        </>
    )
}

const router = createBrowserRouter([
  {
    path: "",
    element : <Layout/>,
    children:[
        {
            path:'/:category',
            element:<Home/>
        },
        {
            index:true,
            element:<Home/>
        },
        {
            path:'/register',
            element:<Register/>

        },
        {
            path:'/login',
            element:<Register/>

        },
        {
            path:'/event/:eventId',
            element:<EventPage/>
        },
        {
            path:'bookingdatetime',
            element:<BookingDateTime/>
        },
        {
            path:'bookticket/:eventName',
            element:<BookTicket/>
        },
        {
            path:'paymentpage',
            element:<PaymentPage/>
        },
        {
            path:'addevent',
            element:<AddEventPage/>
        },
        {
            path : 'updateEvent/:eventId',
            element:<UpdateEventPage/>
        },
        {
            path : 'orders',
            element : <MyOrder/>
        }
    
    ],

  }

]);

export default router;
