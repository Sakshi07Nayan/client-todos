import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todoSlice";
import axios from "axios";
import { Container, Form, Button, ListGroup, Card, Row, Col } from "react-bootstrap";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // Track editing state
  const { items } = useSelector((state) => state.todo);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(token));
  }, [dispatch, token]);

  // Add a new todo
  const addTodo = async () => {
    if (!title.trim()) return alert("Title is required!");
    
    await axios.post(
      "http://localhost:5000/todos",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setDescription("");
    dispatch(fetchTodos(token));
  };

  // Edit an existing todo
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  // Update the edited todo
  const updateTodo = async () => {
    if (!title.trim()) return alert("Title is required!");

    await axios.put(
      `http://localhost:5000/todos/${editingTodo.id}`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setDescription("");
    setEditingTodo(null);
    dispatch(fetchTodos(token));
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchTodos(token));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center">{editingTodo ? "Edit Todo" : "To-Do List"}</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button
            variant={editingTodo ? "warning" : "success"}
            onClick={editingTodo ? updateTodo : addTodo}
            className="w-100"
          >
            {editingTodo ? "Update Todo" : "Add Task"}
          </Button>
        </Form>

        <ListGroup className="mt-4">
          {items.map((todo) => (
            <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{todo.title}</strong> - {todo.description}
              </div>
              <div>
                <Button variant="info" size="sm" className="me-2" onClick={() => editTodo(todo)}>
                  ✏️ Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>
                  ❌ Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}
