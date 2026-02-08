// Common form validation rules

export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

export const isValidPhone = (phone) => {
  const regex = /^[0-9]{10}$/; // Sri Lankan 10-digit pattern
  return regex.test(phone);
};

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isPositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

export const validateReservationDates = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (isNaN(start) || isNaN(end)) return false;

  return end > start; // Check-out must be after check-in
};
