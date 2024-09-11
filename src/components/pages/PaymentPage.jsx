import React, { useState } from 'react'
import BookedTicket from '../bookedtickets/BookedTicket'
import Payment from '../payments/Payment'

function PaymentPage() {

  const[order,setOrder] = useState();

  return (
    <>
        <div style={{display:'flex',justifyContent:'space-between',padding:'50px 100px'}}>
        <Payment order={order}/>
        <BookedTicket order={order} setOrder={setOrder}/>
        </div>
    </>
  )
}

export default PaymentPage
