// Importing necessary packages + necessary boilerplate
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();
app.use(bodyParser.json());
let dbInteractions = require("./database");
const PORT = 3000;

// GET /todos returns a list of all the todos
app.get("/todos", (req, res) => {
  let todos = dbInteractions.getTodos();
  res.status(200).json(todos);
});

// GET /todos/:id returns a specific todo by ID
// @params:
//     - "id" in the path
app.get("/todos/:id", (req, res) => {
  let todo = dbInteractions.getTodo();
  res.status(200).json(todo);
});

// POST /todos creates a new todo and returns it
// @params:
//     - "message" in the body
app.post("/todos", (req, res) => {
  let newTodo = dbInteractions.createTodo(req.body.message);
  res.status(200).json(newTodo);
});

// PUT /todos/:id updates the message of a todo and returns the todo
// @params:
//     - "id" in the path
//     - "message" in the body
app.put("/todos/:id", (req, res) => {
  let updatedTodo = dbInteractions.updateTodo(req.params.id, req.body.message);
  res.status(200).json(updatedTodo);
});

// DELETE /todos/:id deletes a todo and returns "success": true or false
// @params:
//     - "id" in the path
app.delete("/todos/:id", (req, res) => {
  let result = dbInteractions.deleteTodo(req.params.id);
  res.status(200).json({
    success: result
  });
});

// Initializes the server on a certain PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
