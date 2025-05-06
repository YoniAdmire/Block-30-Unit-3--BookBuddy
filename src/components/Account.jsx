/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import { fetchMe, fetchReservations, returnBook } from "../api/libraryApi";

export default function Account() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const userData = await fetchMe(token);
        setUser(userData);
        const books = await fetchReservations(token);
        setReservations(books);
      } catch (err) {
        alert("You must be logged in.");
      }
    };
    loadAccount();
  }, [token]);

  const handleReturn = async (id) => {
    try {
      await returnBook(id, token);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Return failed.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.firstname}'s Account</h2>
      <p>Email: {user.email}</p>
      <h3>Checked Out Books</h3>
      {reservations.length === 0 ? (
        <p>No books checked out.</p>
      ) : (
        reservations.map((book) => (
          <div key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => handleReturn(book.id)}>Return</button>
          </div>
        ))
      )}
    </div>
  );
}
