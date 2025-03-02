import { useNavigate } from "react-router";
import React, { useState } from "react";
import { Link } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../common/copyright/Copyright";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../../common/navbar";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password should match!");
      return;
    }

    try {
      const response = await fetch(
        " https://dev-project-ecommerce.upgrad.dev/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
          }),
        }
      );

      if (response.ok) {
        toast.success("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        toast.error("Signup failed! Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "400px" }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ margin: 1, backgroundColor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ marginTop: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: 3, marginBlock: 2 }}
              >
                Sign Up
              </Button>

              <Typography align="right">
                <Link to="/login">{"Already have an account? Sign In"}</Link>
              </Typography>
            </Box>
          </Box>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
