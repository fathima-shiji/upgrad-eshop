import { toast } from "react-toastify";
import ProductForm from "../../common/productForm/ProductForm";
import { useNavigate } from "react-router";

import { createProductAPI } from "../../api/product";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (product) => {
    try {
      await createProductAPI(product);
      toast.success("Product Created Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return <ProductForm onSubmit={handleCreate} title="Add Product" />;
};

export default AddProduct;
