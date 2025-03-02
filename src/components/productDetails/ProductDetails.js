


import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, TextField, CircularProgress, Chip } from "@mui/material";

import { Link } from 'react-router';


const ProductDetails = () => {
    const {productId} = useParams()
   
    
    const [product, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    
    


    useEffect(() => {
        fetchProductDetails();
        
      }, []);

      
      

    const fetchProductDetails = async  () => {
        try{
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const data = await response.json();
            console.log("API Response:", data);
            setProducts(data);
            
        }catch (error){
            console.error("Error fetching products:", error);
        }finally{
            setLoading(false)
        }
    };




    if (loading) {
        return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>

    }
    if(!product)
        return <Typography variant="h6" color="error">Product is not found</Typography>
   
    


    return (
        <Container maxWidth="md">
            <Box display="flex" alignItems="top" mt={5}>
                <Box flex={1}>
                <img
                        src={product.imageUrl || "https://via.placeholder.com/300"}
                        alt={product.name || "Product Image"}
                        style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                    />

                </Box>

                <Box flex={2} ml={4}>
                <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="h4" fontWeight="bold" mr={2}>
                            {product.name}
                        </Typography>
                        <Chip label={`Available Quantity: ${product.availableItems}`} sx={{ fontSize: "14px", backgroundColor: "#3F51B5", color: "white", "&:hover": { backgroundColor: "#303F9F"  }}  }/>
                    </Box>
                    <Typography variant="h6" mt={2}>
                        category: <span  style={{ fontWeight: "bold", color: "black" }}>{product.category}</span>

                    </Typography>
                    <Typography variant="body1" fontStyle="italic" color="gray" mt={1}>
                        {product.description}
                    </Typography>
                    <Typography variant="h5" color="red" mt={2} fontWeight="bold">
                        ₹ {product.price}
                    </Typography>

                    <Box sx={{marginTop: "20px"}}>
                        <TextField 
                        label="Enter Quantity *"
                        type="number"
                        variant="outlined"
                        value={quantity}
                        mt={2}
                        
                        
                        
                        onChange={(e) => setQuantity (Math.max(1,parseInt(e.target.value) || 1))}
                        slotProps={{htmlInput:{ min: 1, max: product.availableItems }}}
                        sx={{ width: "200px" }}
                        
                        
                            

                        />
                    </Box>
                    <Button 
                    variant="contained"
                    disabled={!quantity}
                  
                   
                    sx={{ mt: 2, px: 3, py: 1, fontSize: "16px", backgroundColor: "#3F51B5", color: "white", "&:hover": { backgroundColor: "#303F9F" } }}
                    component={Link} to={`/product/${product.id}/order?quantity=${quantity}`}>
                    PLACE ORDER

                    </Button>


                </Box>
                
            </Box>

        </Container>
        

    )

   
}

export default ProductDetails;

