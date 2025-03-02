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

export const fetchProductDetailsAPI = async (productId) => {
  const response = await fetch(
    `https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  const data = await response.json();
  return data;
};

export const editProductAPI = async (product) => {
  const response = await fetch(
    `https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
      method: "PUT",
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to edit product");
  }

  const data = await response.json();

  return data;
};

export const createProductAPI = async (product) => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/products",
    {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed create product");
  }

  const data = await response.json();

  return data;
};
