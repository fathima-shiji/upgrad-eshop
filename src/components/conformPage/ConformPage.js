
import React, { useState, useEffect } from "react";
import { useParams ,Link, useSearchParams} from "react-router"
import { Container, Box, Typography, Button,Paper} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {toast } from "react-toastify";



const ConformPage = ({selectedAddress}) => {
const [searchParams] = useSearchParams();
const [product, setProduct] = useState();
const { productId } = useParams(); 


useEffect(() => {
    fetchProduct();
},[])



const fetchProduct = async () => {
try{
    const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`)
    const data = await response.json();

    setProduct(data);
}catch (error){
    console.error("Error fetching products:", error);

};
};
console.log("address", selectedAddress)

const createOrder = async () => {
    if (!product || !selectedAddress) {
      alert("Product or address information is missing!");
      return;
    }

    const orderData = {
      quantity: searchParams.get("quantity"),
      product: productId,
      address: selectedAddress.id, 
    };

    try {
      const response = await fetch("https://dev-project-ecommerce.upgrad.dev/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          "x-auth-token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaTJAZGVtby5jb20iLCJpYXQiOjE3NDA5MDY3NzEsImV4cCI6MTc0MDkxNTE3MX0.MVFfCkLWVIkYPrOaLr17unvg9ZurXayHoirb_C6xnIIePGXF8Z9aWpRoGAsPysE-aOPoJtMjfsBjtQkTdO8FVA"


            
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        toast.success("Order Placed Successfully!");
      } 
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing the order. Please try again later.");
    }
  };





    return(
       <Container  maxWidth="lg" sx={{ mt: 4 }}>
      
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>

            <Grid container>
                <Grid size={8} sx={{borderRight: "1px solid #efefef", paddingRight: "20px"}}>
                {product ? (
                            <Box>  
                                <Typography variant="h5" fontWeight="bold">{product.name}</Typography>
                                <Typography>Quantity: <strong>1</strong></Typography>
                                <Typography>Category: <strong>{product.category}</strong></Typography>
                                <Typography sx={{ fontStyle: "italic", color: "gray" }}>{product.description}</Typography>
                                <Typography sx={{ mt: 2, fontWeight: "bold", color: "red", fontSize: "1.2rem" }}>
                                    Total Price: ₹ {product.price}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
                </Grid>
                <Grid size={4} sx={{paddingLeft:"10px"}}>
                <Typography variant="h6" fontWeight="bold">Address Details:</Typography>
                        <Typography>{selectedAddress?.name}</Typography>
                        <Typography>Contact Number: {selectedAddress?.contact}</Typography>
                        <Typography>{selectedAddress?.address}</Typography>
                        <Typography>{selectedAddress?.city}, {selectedAddress?.state}</Typography>
                        <Typography>{selectedAddress?.zipCode}</Typography>
                </Grid>
            </Grid>










        </Paper>
        

        <Box display="flex" justifyContent="space-between" mt={3}>
                        <Link to="/">
                       

                            <Button 
                            
                            sx={{color:"black"}}>BACK

                            </Button>
                        </Link>
                       
                        <Button variant="contained" color="primary" onClick={createOrder}>
                            PLACE ORDER
                        </Button>
                        
                    </Box>

       </Container>
    )
};
export default ConformPage;

/* product store cheyyan path indakkaa use state
pathilnn product id raad cheyya ; use param use cheythitt
conform page api fech cheyya */