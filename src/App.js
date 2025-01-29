import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header"; 

export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
        <Route path="/todos" element={token ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
