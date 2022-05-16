import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Layout() {
    return ( 
        <>
            <Outlet/>
            <Navigation/>
        </>
     );
}

export default Layout;