import API from "./axiosConfig";

const authApi = {
    login: (credentials) => API.post("/auth/login", credentials),
    registerCustomer: (data) => API.post("/auth/register/customer", data),
    registerStaff: (data) => API.post("/auth/register/staff", data),
    getLoggedUser: () => API.get("/auth/me"),
};

export default authApi;
