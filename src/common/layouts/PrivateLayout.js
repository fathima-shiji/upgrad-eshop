import { useContext, useState } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

import { AuthContext } from "../../App";
import { SearchContext } from "../../context/SearchContext";
import Navbar from "../Navbar";

const PrivateLayout = () => {
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      <Navbar showSearch />
      <Outlet />;
    </SearchContext.Provider>
  );
};
export default PrivateLayout;
