import { useContext, useEffect } from 'react';
import {Outlet} from "react-router" 
import {Navigate} from "react-router"


import { AuthContext } from '../../App';

const AuthLayout = () => {
    const {auth} = useContext(AuthContext);

    if(!auth.isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>

};
export default AuthLayout;