
import './App.css';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import globalToast from './utils/globalToast';
import HomePage from './components/homePage/HomePage';
import FetchSchemes from './components/homePage/FetchSchemes';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import AdminDashboard from './components/adminDashboard/mainDashboard/AdminDashboard';
import City from './components/adminDashboard/cityManagement/City';
import State from './components/adminDashboard/stateManagement/State';
import Agent from './components/adminDashboard/agentManagement/Agent';
import Plan from './components/adminDashboard/planManagement/Plan';
import CustomerList from './components/adminDashboard/customerManagement/CustomerList';
import InsuranceSchemes from './components/adminDashboard/schemeManagement/InsuranceSchemes';
import EmployeeDashboard from './components/employeeDashboard/mainDashboard/EmployeeDashboard';
import Employee from './components/adminDashboard/employeeManagement/Employee';
import AgentList from './components/employeeDashboard/Agents/AgentList';
import ChangePasswordForm from './components/employeeDashboard/ManageProfile/ChangePasswordForm';
import EditProfileForm from './components/employeeDashboard/ManageProfile/EditProfileForm';
import ViewCustomer from './components/employeeDashboard/EditCustomer/ViewCustomer';
import CustomerDashboard from './components/customerDashboard/mainDashboard/CustomerDashboard';
import PasswordChange from './components/customerDashboard/account/PasswordChange';
import EditCustomerProfile from './components/customerDashboard/account/EditCustomerProfile';
import RegisterPage from './components/homePage/RegisterPage';
import BuyPolicyPage from './components/buyPolicy/BuyPolicyPage';
import { PaymentForm } from './components/buyPolicy/BuyPolicyPage';
import PolicyForm from './components/payment/PolicyForm';
import PolicyDetailsPage from './components/policydetails/PolicyDetailsPage';
import PaymentPage from './components/policydetails/PaymentPage';
import PolicyTable from './components/customerDashboard/policy/PolicyTable';
import AgentDashboard from './components/agentDashboard/mainDashboard/AgentDashboard';
import RegisterCustomer from './components/agentDashboard/registerCustomer/RegisterCustomer';
import BuyPolicyWithoutAgent from './components/policydetails/BuyPolicyWithoutAgent';
import AdminLayout from './components/adminDashboard/mainDashboard/AdminLayout';
import CustomerDetails from './components/customerDashboard/new/CustomerDetails';
import CustomerPolicies from './components/customerDashboard/customerPolicy/CustomerPolicies';
import EmployeeLayout from './components/employeeDashboard/mainDashboard/EmployeeLayout';
import SetTaxModal from './components/adminDashboard/taxSettingMnagement/SetTaxModal';
import InstallmentDetails from './components/customerDashboard/customerPolicy/InstallementsDetails';
import ChangePassword from './components/agentDashboard/ChangePassword';
import Commission from './components/agentDashboard/Commision';
import WithdrawCommission from './components/agentDashboard/WithdrawCommission';
import CommissionReport from './components/agentDashboard/CommissionReport';
import ManageCustomers from './components/agentDashboard/ManageCustomers';
import AgentQueries from './components/agentDashboard/AgentQueries';
import Profile from './components/agentDashboard/Profile';
import AdminClaims from './components/adminDashboard/AdminClaims';
import { ToastContainer } from 'react-bootstrap';
import ViewCustomerPolicies from './components/employeeDashboard/EditCustomer/ViewCustomerPolicies';
import EditSchemeModal from './components/adminDashboard/schemeManagement/EditSchemeModal';
import CustomerLayout from './components/customerDashboard/mainDashboard/CustomerLayout';
import AgentLayout from './components/agentDashboard/AgentLayout';
import AgentWithdrawalRequest from './components/agentDashboard/AgentWithdrawalRequest';
import WithdrawalRequestTable from './components/adminDashboard/WithdrawalRequestTable';
import SubmitQuery from './components/customerDashboard/query/SubmitQuery';
import EarningsReport from './components/agentDashboard/earningsReport/EarningsReport';


function App() {
  return (
    <>
    <ToastContainer/>
       {/* <globalToast /> */}
        <Router> 
        <Routes>
          {/* Public routes */} 
        <Route path="/" element={<HomePage />} /> 
       
        <Route path="/login/:role" element={<Login />} /> 
        <Route path="/E-Insurance/register" element={<RegisterPage />} /> 
        <Route path="/E-Insurance/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/E-Insurance/reset-password" element={<ResetPassword />} /> 
        <Route path="/schemes/:planId" element={<FetchSchemes />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/E-Insurance/register" element={<RegisterPage />} />

          <Route path="/E-Insurance/forgot-password" element={<ForgotPassword />} />
          <Route path="/E-Insurance/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/schemes/:planId" element={<FetchSchemes />} /> */}
          <Route element={<AdminLayout />}> 
          <Route path="/E-Insurance/admindashboard" element={<AdminDashboard />} />
          <Route path="/E-Insurance/admindashboard/cities" element={<City />} />
          <Route path="/E-Insurance/admindashboard/states" element={<State />} />
          <Route path="/E-Insurance/admindashboard/employees" element={<Employee />} />
          <Route path="/E-Insurance/admindashboard/agents" element={<Agent />} />
          <Route path="/E-Insurance/admindashboard/plans" element={<Plan />} />
          <Route path="/E-Insurance/admindashboard/viewcustomers" element={<CustomerList />} />
          <Route path="/E-Insurance/admindashboard/schemes" element={<InsuranceSchemes />} />
          <Route path="/E-Insurance/admindashboard/claims" element={<AdminClaims />} />
          <Route path="/E-Insurance/admindashboard/tax" element={<SetTaxModal />} />
          <Route path="/E-Insurance/admindashboard/edit-scheme/${scheme.insuranceSchemeId}" element={<EditSchemeModal/>} />
          <Route path="/E-Insurance/admindashboard/agentclaim" element={<WithdrawalRequestTable/>} />
         
          </Route>
          {/* ---- employyess */}
          <Route element={<EmployeeLayout />}>
           <Route path="/E-Insurance/employeedashboard" element={<EmployeeDashboard />} />
           <Route path="/E-Insurance/employeedashboard/agent-registration" element={<AgentList />} /> 
           <Route path="/E-Insurance/employeedashboard/changeemployeepassword" element={<ChangePasswordForm/>}/>
           <Route path="/E-Insurance/employeedashboard/edit-profile" element={<EditProfileForm/>}/>
         
           <Route path="/E-Insurance/employeedashboard/viewcustomer" element={<ViewCustomer/>}/>
           <Route path="/customer-policies/:customerId" element={<ViewCustomerPolicies />} /> 
           </Route>
           
           {/* customer-dashboard */}
           <Route element={<CustomerLayout/>}>
           <Route path="/E-Insurance/customerdashboard" element={<CustomerDashboard/>}/>
           <Route path="/E-Insurance/customerdashboard/changecustomerpassword" element={<PasswordChange/>}/>
           <Route path="/E-Insurance/customerdashboard/edit-customerprofile" element={<EditCustomerProfile/>}/>
           <Route path="/E-Insurance/customer/queries" element={<SubmitQuery/>}/>

          
{/* // buy policy */}
 {/* <Route path="/buy-policy" element={<BuyPolicyPage />} />  */}
{/* <Route path="/payment" element={<PaymentForm />} /> */}

{/* <Route path="/buy-policy" element={<PolicyDetailsPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<ConfirmationPage />} /> */}
             {/* <Route path="/buy-policy" element={<Buy />} /> 
              */}

{/* <Route path="/buy-policy" element={<PolicyForm />} /> */}

<Route path="/buy-policy" element={<PolicyDetailsPage />} />
{/* <Route path="/payment/:policyId" element={<PaymentPage />} /> */}
<Route path="/payment/:policyId" element={<PaymentPage/>} />
<Route path="/E-Insurance/customer/customerpolicies" element={<PolicyTable/>} />

{/* agentdashboard */}

<Route path="/buy-policy-without" element={<BuyPolicyWithoutAgent />} />
 <Route path="/E-Insurance/customerdashboard/policy-installments" element={<CustomerPolicies/>}/>
                
<Route path="/installments/:insuranceId" element={<InstallmentDetails/>} />
                <Route path="/customer-details" element={<CustomerDetails />} />
                </Route>


<Route element={<AgentLayout />} >
                <Route path="/E-Insurance/agentdashboard" element={<AgentDashboard />} />
                <Route path="/E-Insurance/agent/profile" element={<Profile />} />
                <Route path="/E-Insurance/agent/change-password" element={<ChangePassword />} />
                <Route path="/E-Insurance/agent/commission" element={<Commission />} />
                <Route path="/E-Insurance/agent/withdraw" element={<WithdrawCommission />} />
                <Route path="/E-Insurance/agent/earnings" element={<EarningsReport />} />
                <Route path="/E-Insurance/agent/commission-report" element={<CommissionReport />} />
                <Route path="/E-Insurance/agent/customer" element={<ManageCustomers />} />
                <Route path="/E-Insurance/agent/customer-queries" element={<AgentQueries />} />
                {/* <Route path="/E-Insurance/agent/claim" element={<AgentClaimComponent />} /> */}
                <Route path="/E-Insurance/agent/withdrawals" element={<AgentWithdrawalRequest />} />
                <Route path="/E-Insurance/agentdashboard/registercustomer" element={<RegisterCustomer />} />
                </Route>
            </Routes>
       </Router> 
       </>
   
  );
}

export default App


// <Route element={<AgentLayout />} >
// <Route path="/E-Insurance/agent/dashboard" element={<AgentDashboard />} />
// <Route path="/E-Insurance/agent/profile" element={<Profile />} />
// <Route path="/E-Insurance/agent/change-password" element={<ChangePassword />} />
// <Route path="/E-Insurance/agent/commission" element={<Commission />} />
// <Route path="/E-Insurance/agent/withdraw" element={<WithdrawCommission />} />
// <Route path="/E-Insurance/agent/earnings" element={<Earnings />} />
// <Route path="/E-Insurance/agent/commission-report" element={<CommissionReport />} />
// <Route path="/E-Insurance/agent/customer" element={<Customers />} />
// <Route path="/E-Insurance/agent/customer-queries" element={<AgentQueries />} />
// <Route path="/E-Insurance/agent/claim" element={<AgentClaimComponent />} />
// <Route path="/E-Insurance/agent/withdrawals" element={<AgentWithdrawalRequest />} />

// </Route>
