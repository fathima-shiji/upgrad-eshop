import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router";



const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 20,
    width: "30%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));


const Navbar = ({isLoggedIn}) => {
    return (
        <AppBar position="static"  sx={{ backgroundColor: "#3949AB" }}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Link to="/" style={{color: "white", textDecoration: "none"}}>
                <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
                  
                    <ShoppingCartIcon sx={{ marginRight: 1 }} />
                    upGrad E-Shop
                  
                </Typography>
                </Link>
                
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                </Search>
                <div style={{display: "flex", alignItems: "center", gap: "20px",}}>
                    <Typography variant="body1" component="a" href="#" sx={{color: "white", textDecoration: "underline"}}> 
                        Home

                    </Typography>
                    <Typography variant="body1" component="a" href="#" sx={{color: "white", textDecoration: "underline"}}>
                        Add Product
                    </Typography>

              


                {
                    isLoggedIn ? (
                        <Button 
                    variant="contained" 
                    color="error" 
                    sx={{fontWeight: "bold"}}
                    component={Link} to="/login">
                        Logout

                    </Button>
                    )
                     : 
                     (
                        <Button 
                        variant="contained" 
                        color="error" 
                        sx={{fontWeight: "bold"}}
                        component={Link} to="/login">
                            LOGIN
    
                        </Button>
                     )
                }
                
                   
                    
                </div>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
