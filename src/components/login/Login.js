import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { AuthContext } from "../../App";
import Navbar from "../../common/Navbar";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required!");
      return;
    }

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://dev-project-ecommerce.upgrad.dev/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const jsonResponse = await response.json();

      if (!response.ok) {
        toast.error("Login Failed");
      }

      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGlqaTJAZGVtby5jb20iLCJpYXQiOjE3NDA4MjA2NzMsImV4cCI6MTc0MDgyOTA3M30.rSfKtcviQg_mJBf5uwf9a9gIE6erivyFNlU4Z-qZM3AadhuVNTOc-A4axikZ6pDD-WA54_KKPSrWQ5aeJTdomw";
      if (token) {
        localStorage.setItem("authToken", token);
      }

      setAuth({
        isLoggedIn: true,
        user: jsonResponse,
      });

      toast.success("Login successful!");
      navigate("/");
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
            <Avatar sx={{ margin: 1, bgcolor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ marginTop: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginBlock: 2, marginTop: 3 }}
              >
                Sign In
              </Button>

              <Typography align="left">
                <Link to="/signup" variant="body 2">
                  {" "}
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
