import API from "./axiosConfig";

const customerApi = {
    createCustomer: (data) => API.post("/customers", data),
    getCustomer: (id) => API.get(`/customers/${id}`),
    getAllCustomers: () => API.get("/customers"),
    updateCustomer: (id, data) => API.put(`/customers/${id}`, data),
    deleteCustomer: (id) => API.delete(`/customers/${id}`),
};

export default customerApi;
