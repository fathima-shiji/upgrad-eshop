export const createOrderAPI = async (orderData) => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to place order!");
  }

  const data = await response.json();
  return data;
};
