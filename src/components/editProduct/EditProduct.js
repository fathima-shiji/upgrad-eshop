import { toast } from "react-toastify";
import ProductForm from "../../common/productForm/ProductForm";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (product) => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/products/",
        {
          method: "POST",
          body: JSON.stringify(product),
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

  if (isLoading) return "Loading";

  return (
    <ProductForm
      onSubmit={handleCreate}
      initialData={product}
      title="Modify Product"
    />
  );
};

export default EditProduct;
