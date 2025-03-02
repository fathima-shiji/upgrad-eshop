export const fetchProductsAPI = async () => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/products",
    {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );

  if (!response.ok) {
    throw Error("Failed to fetch products!");
  }
  const data = await response.json();
  return data;
};

export const deleteProductAPI = async (selectedProduct) => {
  const response = await fetch(
    `https://dev-project-ecommerce.upgrad.dev/api/products/${selectedProduct.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );

  if (!response.ok) {
    throw Error("Failed to delete product!");
  }

  const data = await response.json();
  return data;
};
