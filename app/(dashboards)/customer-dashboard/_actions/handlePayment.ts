export const handlePayment = async (orderId: string) => {
  try {
    // তোমার payment API/server action call করবে
    console.log("Paying for order:", orderId);
  } catch (error) {
    console.error(error);
  }
};