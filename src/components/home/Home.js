import { useEffect, useState } from "react";
import CategoryTabs from "../categoryTabs/CategoryTabs";
import ProductList from "../productsList/ProductList";
import { Container } from "@mui/material";
import SortBy from "../sortBy/SortBy";

const Home = () => {
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts]= useState([]);
  const [sortOption, setSortOption]= useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  
  const fetchCategories = async () => {
    try {
      const response = await fetch( "https://dev-project-ecommerce.upgrad.dev/api/products/categories");
      const data = await response.json();
      const categoriesWithAll = ["All", ...data]
      setCategories(categoriesWithAll); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {

    try {
        const response = await fetch("https://dev-project-ecommerce.upgrad.dev/api/products");
        const data = await response.json();
         setProducts(data);

    }catch (error){
        console.error("Error fetching products:", error);
    }
   
  };

  const filterproducts = () => {
    if(selectedCategory === "All") {
        return products;
    }
    return products.filter(isSelectedCategoryProduct)
  }

  const isSelectedCategoryProduct = (product) => {
    return product.category === selectedCategory
  }

  const filteredproducts = filterproducts() 

  




  


  

  return (
    

      <Container>
      <CategoryTabs 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}/> 

       <SortBy sortOption={sortOption} setSortOption={setSortOption} />


        <ProductList products={filteredproducts}/>
       
       
      

        </Container>
        
           
       
     
     

   
  );
};

export default Home;
