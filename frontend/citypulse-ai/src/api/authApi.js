import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const login = async (loginRequest) => {
  //loginRequest is the object we pass to the request that contains username and password
  const response = await axiosClient.post(
    API_ENDPOINTS.AUTH.LOGIN, //auth/login, axios automatically adds the base url so it becomes http://localhost:8080/api/v1/auth/login
    loginRequest, // this part becomes the request body
  );

  return response.data.data; //we just need the data part, not the headers, config, request , status.
};

/**
 * Staff-only login (Officer, Department Manager, Admin). The backend
 * rejects citizen accounts here with a clear "wrong portal" message.
 */
const staffLogin = async (loginRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.AUTH.STAFF_LOGIN,
    loginRequest,
  );

  return response.data.data;
};

export const authApi = {
  login,
  staffLogin,
};
