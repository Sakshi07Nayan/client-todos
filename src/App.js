import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import AuthForm from "./components/AuthForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header"; 
import Register from "./components/register";
import Login from "./components/login";

export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={token ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
