
// 📁 src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
