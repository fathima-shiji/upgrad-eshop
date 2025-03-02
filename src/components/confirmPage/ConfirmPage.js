import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";

import { fetchProductDetailsAPI } from "../../api/product";
import { createOrderAPI } from "../../api/order";

const ConfirmPage = ({ selectedAddress }) => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await fetchProductDetailsAPI(productId);

      setProduct(data);
    } catch (error) {
      toast.error("Failed to fetch prooduct details");
    }
  };

  const createOrder = async () => {
    if (!product || !selectedAddress) {
      toast.error("Product or Address information is missing!");
      return;
    }

    const orderData = {
      quantity: searchParams.get("quantity"),
      product: productId,
      address: selectedAddress.id,
    };

    try {
      await createOrderAPI(orderData);
      toast.success("Order placed successfully");
      navigate("/");
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Grid container>
          <Grid
            size={8}
            sx={{ borderRight: "1px solid #efefef", paddingRight: "20px" }}
          >
            {product ? (
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography>
                  Quantity: <strong>1</strong>
                </Typography>
                <Typography>
                  Category: <strong>{product.category}</strong>
                </Typography>
                <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                  {product.description}
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    color: "red",
                    fontSize: "1.2rem",
                  }}
                >
                  Total Price: ₹ {product.price}
                </Typography>
              </Box>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Grid>
          <Grid size={4} sx={{ paddingLeft: "10px" }}>
            <Typography variant="h6" fontWeight="bold">
              Address Details:
            </Typography>
            <Typography>{selectedAddress?.name}</Typography>
            <Typography>Contact Number: {selectedAddress?.contact}</Typography>
            <Typography>{selectedAddress?.address}</Typography>
            <Typography>
              {selectedAddress?.city}, {selectedAddress?.state}
            </Typography>
            <Typography>{selectedAddress?.zipCode}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Link to="/">
          <Button sx={{ color: "black" }}>BACK</Button>
        </Link>

        <Button variant="contained" color="primary" onClick={createOrder}>
          PLACE ORDER
        </Button>
      </Box>
    </Container>
  );
};
export default ConfirmPage;
