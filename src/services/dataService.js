import axios from 'axios'; 
 
export const fetchTotalPolicies = async () => { 
  try { 
    const response = await axios.get('/api/policies/count'); 
    return response.data; 
  } catch (error) { 
    console.error('Error fetching total policies:', error); 
    return 0; 
  } 
}; 
 
export const fetchTotalQueries = async () => { 
  try { 
    const response = await axios.get('/api/queries/count'); 
    return response.data; 
  } catch (error) { 
    console.error('Error fetching total queries:', error); 
    return 0; 
  } 
}; 
 
export const fetchActiveAgents = async () => { 
  try { 
    const response = await axios.get('/api/agents/active'); 
    return response.data; 
  } catch (error) { 
    console.error('Error fetching active agents:', error); 
    return 0; 
  } 
}; 
export const fetchCustomerPoliciesCount = async () => { 
    try { 
      const response = await axios.get('/api/customer/policies/count'); // Adjust the endpoint 
      return response.data.count; // Assuming the response returns an object with count 
    } catch (error) { 
      console.error('Error fetching customer policies count:', error); 
      return 0; 
    } 
  };