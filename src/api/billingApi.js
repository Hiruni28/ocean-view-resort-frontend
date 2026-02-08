import API from "./axiosConfig";

const billingApi = {
    generateBill: (reservationId) =>
        API.post(`/billing/generate/${reservationId}`),

    getBill: (billId) =>
        API.get(`/billing/${billId}`),

    getBillByReservation: (reservationId) =>
        API.get(`/billing/reservation/${reservationId}`),

    updatePaymentStatus: (billId, status) =>
        API.put(`/billing/${billId}/status?status=${status}`),
};

export default billingApi;
