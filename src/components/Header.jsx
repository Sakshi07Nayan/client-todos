import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Todo App</Navbar.Brand>
        {token && (
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
