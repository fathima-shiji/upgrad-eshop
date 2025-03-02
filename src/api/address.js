export const fetchAddressesAPI = async () => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/addresses",
    {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  return data;
};

export const createAddressAPI = async (address) => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/addresses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
      body: JSON.stringify(address),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save address");
  }

  const data = await response.json();

  return data;
};
