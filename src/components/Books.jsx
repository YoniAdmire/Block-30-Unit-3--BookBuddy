/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react";
import { fetchBooks } from "../api/libraryApi"; 
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    getBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Library Catalog</h2>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredBooks.map((book) => (
        <div key={book.id}>
          <Link to={`/books/${book.id}`}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Link>
        </div>
      ))}
      {filteredBooks.length === 0 && <p>No books found.</p>}
    </div>
  );
}
