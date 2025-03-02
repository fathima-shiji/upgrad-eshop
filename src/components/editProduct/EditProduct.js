import { toast } from "react-toastify";
import ProductForm from "../../common/productForm/ProductForm";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { editProductAPI, fetchProductDetailsAPI } from "../../api/product";

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
      const data = await fetchProductDetailsAPI(productId);
      setProduct(data);
    } catch (error) {
      toast.error("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (product) => {
    try {
      await editProductAPI(product);
      toast.success("Product Created Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (isLoading) return "Loading";

  return (
    <ProductForm
      onSubmit={handleEdit}
      initialData={product}
      title="Modify Product"
    />
  );
};

export default EditProduct;
