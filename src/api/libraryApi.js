const BASE_URL = "https://bookbuddy-api.example.com/api";

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const register = async (formData) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

export const fetchMe = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return await res.json();
};

export const fetchReservations = async (token) => {
  const res = await fetch(`${BASE_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return await res.json();
};

export const returnBook = async (reservationId, token) => {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Return failed");
  return;
};

export const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return await res.json();
};

export const fetchBookById = async (id) => {
  const res = await fetch(`${BASE_URL}/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return await res.json();
};

export const reserveBook = async (bookId, token) => {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!res.ok) throw new Error("Reservation failed");
  return await res.json();
};
