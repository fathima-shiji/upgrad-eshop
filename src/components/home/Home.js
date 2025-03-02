import { useEffect, useState, useContext } from "react";
import CategoryTabs from "../categoryTabs/CategoryTabs";
import ProductList from "../productsList/ProductList";
import { Container } from "@mui/material";
import SortBy from "../sortBy/SortBy";
import { toast } from "react-toastify";

import { SearchContext } from "../../context/SearchContext";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/products/categories"
      );
      const data = await response.json();
      const categoriesWithAll = ["All", ...data];
      setCategories(categoriesWithAll);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/products"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (selectedProduct) => {
    try {
      const response = await fetch(
        `https://dev-project-ecommerce.upgrad.dev/api/products/${selectedProduct.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaTJAZGVtby5jb20iLCJpYXQiOjE3NDA5MjM1NzAsImV4cCI6MTc0MDkzMTk3MH0.JRAaDngnxb5I_3vqiEpHQvv61FobjsSjSZVJtQleZZNcXY9tbipJCwQfYYZ1MRRF5PlGR3HdCa5VV95CJfUZlA",
          },
        }
      );

      if (response.ok) {
        setProducts(
          products.filter((product) => product.id !== selectedProduct.id)
        );

        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete product!");
      console.error("Error fetching categories:", error);
    }
  };

  const filterproducts = () => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter(isSelectedCategoryProduct);
  };

  const isSelectedCategoryProduct = (product) => {
    return product.category === selectedCategory;
  };

  const filteredproducts = filterproducts();

  const searchedProducts = searchTerm
    ? products.filter((product) => product.name.includes(searchTerm))
    : filteredproducts;

  return (
    <Container>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SortBy sortOption={sortOption} setSortOption={setSortOption} />

      <ProductList products={searchedProducts} deleteProduct={deleteProduct} />
    </Container>
  );
};

export default Home;
