import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import SelectBox from "../selectBox/SelectBox";

const ProductForm = ({ initialData = {}, onSubmit, title }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: null,
    imageUrl: "",
    description: "",
    manufacturer: "",
    availableItems: null,
    ...initialData,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/products/categories"
      );
      const data = await response.json();
      setCategories(
        data.map((category) => ({
          label: category,
          value: category,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (selectedOption) => {
    setProduct({ ...product, category: selectedOption?.value || "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={product.name}
          onChange={handleChange}
          required
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Category
          </Typography>
          <SelectBox
            options={categories}
            value={categories.find((cat) => cat.value === product.category)}
            onChange={handleCategoryChange}
            isCreatable
          />
        </Box>
        <TextField
          type="number"
          label="Price"
          name="price"
          fullWidth
          margin="normal"
          value={product.price}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Available Items"
          name="availableItems"
          fullWidth
          margin="normal"
          value={product.availableItems}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          fullWidth
          margin="normal"
          value={product.imageUrl}
          onChange={handleChange}
        />
        <TextField
          label="Product Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          label="Manufacturer"
          name="manufacturer"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={product.manufacturer}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {initialData.id ? "Update Product" : "Save Product"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
