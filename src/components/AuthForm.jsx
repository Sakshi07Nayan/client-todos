import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };


  const validateForm = () => {
    let newErrors = {};
    if (type === "register" && !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    const url = `https://server-todos.onrender.com/auth/${type}`;
    try {
      const { data } = await axios.post(url, formData);
      if (type === "login") {
        dispatch(loginSuccess(data.token));
        navigate("/todos");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4">
        <h2 className="text-center">{type === "login" ? "Login" : "Register"}</h2>


        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form onSubmit={handleSubmit}>
          {type === "register" && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {type === "login" ? "Login" : "Register"}
          </Button>
        </Form>

    
        <div className="text-center mt-3">
          {type === "login" ? (
            <p>
              Not registered? <Link to="/register">Sign Up</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          )}
        </div>
      </Card>
    </Container>
  );
}
