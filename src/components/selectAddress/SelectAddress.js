import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

import { fetchAddressesAPI, createAddressAPI } from "../../api/address";

import SelectBox from "../../common/selectBox/SelectBox";
import { toast } from "react-toastify";

const DEFAULT_ADDRESS = {
  name: "",
  contactNumber: "",
  city: "",
  landmark: "",
  street: "",
  state: "",
  zipcode: "",
};

const SelectAddress = ({ onChangeAddress, selectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState(DEFAULT_ADDRESS);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await fetchAddressesAPI();
      setAddresses(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newAddress = await createAddressAPI(addressForm);

      setAddresses([...addresses, newAddress]);

      onChangeAddress(newAddress);
      setAddressForm(DEFAULT_ADDRESS);

      toast.success("Address created successfully!");
    } catch (error) {
      toast.error("Failed to create address");
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

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
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.name}
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.contactNumber}
          />
          <TextField
            label="Street"
            name="street"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.street}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.city}
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.state}
          />
          <TextField
            label="Landmark"
            name="landmark"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.landmark}
          />
          <TextField
            label="Zip Code"
            name="zipcode"
            fullWidth
            required
            sx={{ mt: 2 }}
            onChange={handleInputChange}
            value={addressForm.zipcode}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Save Address
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default SelectAddress;
