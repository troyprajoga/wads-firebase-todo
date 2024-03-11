// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import TodoList from "./TodoList";
import RegisterForm from "./RegisterForm";
import AccountPage from "./Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
