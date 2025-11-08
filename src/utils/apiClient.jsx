import { getCookie } from "./cookies";

const baseURL = "http://192.168.1.235:5000";

export const apiClient = async (url, method, body = null, tokenName = "") => {
  const accessToken = getCookie("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (tokenName) {
    defaultHeaders["Authorization"] = `Bearer ${getCookie(tokenName)}`;
  } else {
    defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  const config = {
    method,
    headers: defaultHeaders,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${baseURL}${url}`, config);

    // 🔴 Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || "Something went wrong",
      };
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error; // rethrow so frontend can handle it
  }
};

// user authentication ...............................
// Auth APIs
apiClient.login = (payload) => apiClient("/users/login", "POST", payload);

apiClient.signup = (payload) => apiClient("/users/signup", "POST", payload);

apiClient.resetPassword = (token, payload) =>
  apiClient(`/users/resetPassword/${token}`, "PATCH", payload);

apiClient.forgotPassword = (payload) =>
  apiClient("/users/forgotPassword", "PATCH", payload);

// Product APIs

apiClient.getProducts = () => apiClient("/manageStock/getProducts", "GET");

apiClient.getAllInventory = () =>
  apiClient("/manageStock/getAllInventory", "GET");

apiClient.getAllEntries = (page, limit) =>
  apiClient(`/manageStock/getAllEntries?page=${page}&limit=${limit}`, "GET");

apiClient.getAllExits = (page, limit) =>
  apiClient(`/manageStock/getAllExits?page=${page}&limit=${limit}`, "GET");

apiClient.addProduct = (payload) =>
  apiClient("/manageStock/addProduct", "POST", payload);

apiClient.productEntry = (payload) =>
  apiClient("/manageStock/productEntry", "POST", payload);

apiClient.productExit = (payload) =>
  apiClient("/manageStock/productExit", "POST", payload);
