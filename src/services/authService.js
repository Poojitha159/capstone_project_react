import axios from "axios";

export const verifyUser = async (accessToken, userRole) => {
    try {

      const response = await axios.get(`http://localhost:8080/E-Insurance/auth/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          role: userRole,
        },
      });
  
      if (response.data === false) {
        localStorage.clear();
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };