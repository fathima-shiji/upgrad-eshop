import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from 'react-router';

import SelectBox from "../../common/selectBox/SelectBox";
import ConformPage from "../conformPage/ConformPage";




const DEFAULT_ADDRESS = {
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipcode: ""
}


const SelectAddress = ({ onChangeAddress, selectedAddress }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressForm, setAddressForm] = useState(DEFAULT_ADDRESS);



    useEffect(() => {
        fetchAddresses();

    }, []);

    const fetchAddresses = async () => {

        try {
            const response = await fetch("https://dev-project-ecommerce.upgrad.dev/api/addresses", {
                headers: {
                    "x-auth-token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaTJAZGVtby5jb20iLCJpYXQiOjE3NDA5MDY3NzEsImV4cCI6MTc0MDkxNTE3MX0.MVFfCkLWVIkYPrOaLr17unvg9ZurXayHoirb_C6xnIIePGXF8Z9aWpRoGAsPysE-aOPoJtMjfsBjtQkTdO8FVA"
                }
            });

            const data = await response.json();
            setAddresses(data);
        } catch (error) {
            console.error("Error fetching addresses:", error);

        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch("https://dev-project-ecommerce.upgrad.dev/api/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaTJAZGVtby5jb20iLCJpYXQiOjE3NDA5MDY3NzEsImV4cCI6MTc0MDkxNTE3MX0.MVFfCkLWVIkYPrOaLr17unvg9ZurXayHoirb_C6xnIIePGXF8Z9aWpRoGAsPysE-aOPoJtMjfsBjtQkTdO8FVA"
                },
                body: JSON.stringify(addressForm),
            });

            if (!response.ok) {
                throw new Error("Failed to save address");
            }

            const newAddress = await response.json();

            setAddresses([
                ...addresses,
                newAddress
            ])

            onChangeAddress(newAddress)
            setAddressForm(DEFAULT_ADDRESS)


            alert("Address saved successfully!");
        } catch (error) {
            console.error("Error saving address:", error);
        }

    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <h1 style={{ textAlign: "center" }}>Select Address Page</h1>
            <SelectBox
                options={addresses}
                onChange={onChangeAddress}
                value={selectedAddress}
                getOptionLabel={(address) => address.name}
                getOptionValue={(address) => address.id}
            />
            <Box>

                <Typography align="center" sx={{ mt: 3, mb: 2 }}>
                    - OR -

                </Typography>
                <Typography variant="h6" align="center" sx={{ mt: 3, mb: 2 }}>
                    Add Address

                </Typography>
                <form onSubmit={handleSubmit}>


                    <TextField
                        label="Name"
                        name="name"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.name}
                    />
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.contactNumber}

                    />
                    <TextField
                        label="Street"
                        name="street"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.street}

                    />
                    <TextField
                        label="City"
                        name="city"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.city}
                    />
                    <TextField
                        label="State"
                        name="state"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.state} />
                    <TextField
                        label="Landmark"
                        name="landmark"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.landmark} />
                    <TextField
                        label="Zip Code"
                        name="zipcode"
                        fullWidth required
                        sx={{ mt: 2 }}
                        onChange={handleInputChange}
                        value={addressForm.zipcode} />

                    <Button type="submit"
                        fullWidth variant="contained" sx={{ marginTop: 3, marginBottom: 2 }}>
                        Save Address
                    </Button>
                </form>




            </Box>



        </Container>



    )

}
export default SelectAddress;