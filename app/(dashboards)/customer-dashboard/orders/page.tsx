import React from 'react'
import { getRentalOrders } from '../_actions/getRentalOrders';

const MyOrdersPage = async() => {
  const myOrders = await getRentalOrders();
  console.log(myOrders.data[0].gear);
  return (
    <div>
      This is the my order page!
    </div>
  )
}

export default MyOrdersPage;
