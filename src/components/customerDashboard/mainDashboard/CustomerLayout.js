import React from 'react'; 
import { Outlet } from 'react-router-dom'; 
import CustomerNavbar from './CustomerNavbar'; // Your navbar component 
 
const CustomerLayout = () => { 
  return ( 
    <div> 
      <CustomerNavbar /> {/* This should be static and always visible */} 
      <div className="container mt-5"> {/* Ensure enough top margin */} 
        <Outlet /> {/* This is where child routes will render */} 
      </div> 
    </div> 
  ); 
}; 
 
export default CustomerLayout;