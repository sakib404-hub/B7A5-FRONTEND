import React from 'react'
import { getProviderOrders } from './_action/getProviderOrders';

const MyOrdersPage = async() => {

  const providerOrders = await getProviderOrders();
  console.log(providerOrders);
  return (
    <div>
      This is my orders page for provider.
    </div>
  )
}

export default MyOrdersPage;
