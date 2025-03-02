export const fetchCategoriesAPI = async () => {
  const response = await fetch(
    "https://dev-project-ecommerce.upgrad.dev/api/products/categories",
    {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );
  const data = await response.json();
  return data;
};
