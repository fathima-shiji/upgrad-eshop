import { toast } from "react-toastify";
import ProductForm from "../../common/productForm/ProductForm";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (product) => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/products",
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaUBkZW1vLmNvbSIsImlhdCI6MTc0MDkzNDg2OSwiZXhwIjoxNzQwOTQzMjY5fQ.LQ_mgros14fVqQrF_MOq-YcJmxV0Gx7P6l927iN7KaLAPMANY95s2eHA1S4NsIO3HBwtplI2VnoAoVwfUYBj9w",
          },
        }
      );

      if (response.ok) {
        toast.success("Product Created Successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return <ProductForm onSubmit={handleCreate} title="Add Product" />;
};

export default AddProduct;
