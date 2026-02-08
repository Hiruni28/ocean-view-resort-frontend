// Utility functions for date formatting and calculations

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diffTime = end - start;
  const nights = diffTime / (1000 * 60 * 60 * 24);

  return nights > 0 ? nights : 0;
};

export const todayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};
