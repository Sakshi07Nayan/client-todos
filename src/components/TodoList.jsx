import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todoSlice";
import axios from "axios";
import { Container, Form, Button, ListGroup, Card } from "react-bootstrap";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { items } = useSelector((state) => state.todo);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(token));
  }, [dispatch, token]);

  const addTodo = async () => {
    await axios.post(
      "http://localhost:5000/todos",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(fetchTodos(token));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center">To-Do List</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Button variant="success" onClick={addTodo} className="w-100">
            Add Task
          </Button>
        </Form>

        <ListGroup className="mt-4">
          {items.map((todo) => (
            <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}
