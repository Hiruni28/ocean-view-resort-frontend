import API from "./axiosConfig";

const foodApi = {
    placeOrder: (data) => API.post("/food-orders", data),
    getOrder: (id) => API.get(`/food-orders/${id}`),
    getByReservation: (reservationId) =>
        API.get(`/food-orders/reservation/${reservationId}`),
    updateOrder: (id, data) => API.put(`/food-orders/${id}`, data),
    cancelOrder: (id) => API.delete(`/food-orders/${id}`),
};

export default foodApi;
