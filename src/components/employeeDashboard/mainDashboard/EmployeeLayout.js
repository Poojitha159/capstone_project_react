// src/components/layout/EmployeeLayout.js 
import React from 'react'; 
import EmployeeNavbar from './EmployeeNavbar'; 
import { Outlet } from 'react-router-dom'; // Renders the child route components 
 
const EmployeeLayout = () => { 
  return ( 
    <div> 
      <EmployeeNavbar /> 
      <div className="container mt-4"> 
        <Outlet /> {/* This renders the current route's component */} 
      </div> 
    </div> 
  ); 
}; 
 
export default EmployeeLayout;