import API from "./axiosConfig";

const reservationApi = {
    createReservation: (data) => API.post("/reservations", data),
    getReservation: (id) => API.get(`/reservations/${id}`),
    getAllReservations: () => API.get("/reservations"),
    getByCustomer: (customerId) =>
        API.get(`/reservations/customer/${customerId}`),
    updateReservation: (id, data) =>
        API.put(`/reservations/${id}`, data),
    cancelReservation: (id) =>
        API.delete(`/reservations/${id}`),
};

export default reservationApi;
