/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById, reserveBook } from "../api/libraryApi";

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getBook = async () => {
      const data = await fetchBookById(id);
      setBook(data);
    };
    getBook();
  }, [id]);

  const handleCheckout = async () => {
    try {
      await reserveBook(book.id, token);
      alert("Book reserved!");
    } catch (error) {
      alert("Checkout failed.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>{book.description}</p>
      {book.available && token && (
        <button onClick={handleCheckout}>Check Out</button>
      )}
    </div>
  );
}