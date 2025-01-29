import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (token) => {
  const response = await axios.get("http://localhost:5000/todos", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
  },
});

export default todoSlice.reducer;