import React from 'react'; 
import AdminNavbar from './AdminNavbar'; 
import { Outlet } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
 
const AdminLayout = () => { 
  return ( 
    <div> 
      <AdminNavbar /> 
      <div className="container mt-4"> 
        <Outlet /> {/* This will render the specific admin page content */} 
      </div> 
    </div> 
  ); 
}; 
 
export default AdminLayout;
