import React from 'react'; 
import Navbar from './Navbar'; 
import AdminNavbar from '../adminDashboard/mainDashboard/AdminLayout';
import { Outlet } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AgentNavbar from './AgentNavbar';
 
const AgentLayout = () => { 
  return ( 
    <div> 
      {/* <AdminNavbar />  */}
      <AgentNavbar/>
      <div className="container mt-4"> 
        <Outlet /> {/* This will render the specific admin page content */} 
      </div> 
    </div> 
  ); 
}; 
 
export default AgentLayout;