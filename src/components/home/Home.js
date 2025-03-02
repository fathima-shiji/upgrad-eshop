import { useEffect, useState, useContext } from "react";
import CategoryTabs from "../categoryTabs/CategoryTabs";
import ProductList from "../productsList/ProductList";
import { Container } from "@mui/material";
import SortBy from "../sortBy/SortBy";
import { toast } from "react-toastify";

import { SearchContext } from "../../context/SearchContext";

import { fetchProductsAPI, deleteProductAPI } from "../../api/product";
import { fetchCategoriesAPI } from "../../api/catogory";

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
      const data = await fetchCategoriesAPI();
      const categoriesWithAll = ["All", ...data];
      setCategories(categoriesWithAll);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await fetchProductsAPI();
      setProducts(products);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const deleteProduct = async (selectedProduct) => {
    try {
      await deleteProductAPI(selectedProduct.id);
      setProducts(
        products.filter((product) => product.id !== selectedProduct.id)
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  const filterproducts = () => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter(isSelectedCategoryProduct);
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];

    if (sortOption === "price-high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "price-low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "newest") {
      return sortedProducts;
    }

    return sortedProducts;
  };

  const isSelectedCategoryProduct = (product) => {
    return product.category === selectedCategory;
  };

  const filteredproducts = filterproducts();

  const searchedProducts = searchTerm
    ? products.filter((product) => product.name.includes(searchTerm))
    : filteredproducts;

  const sortedProducts = !sortOption ? searchedProducts : getSortedProducts();

  return (
    <Container>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SortBy sortOption={sortOption} setSortOption={setSortOption} />

      <ProductList products={sortedProducts} deleteProduct={deleteProduct} />
    </Container>
  );
};

export default Home;
