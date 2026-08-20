import { getProviderOrders } from "./_action/getProviderOrders";
import { OrdersHeader } from "./_components/OrdersHeader";
import { ProviderOrdersList } from "./_components/ProviderOrderList";

const MyOrdersPage = async () => {
  const providerOrders = await getProviderOrders();

  return (
    <div className="space-y-6">
      <OrdersHeader />
      <ProviderOrdersList orders={providerOrders?.data ?? []} />
    </div>
  );
};

export default MyOrdersPage;