const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

let dbInteractions = require("./database");
const PORT = 3000;

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  let todos = dbInteractions.getTodos();
  res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todo = dbInteractions.getTodo();
  res.status(200).json(todo);
});

app.post("/todos", (req, res) => {
  let newTodo = dbInteractions.createTodo(req.body.message);
  res.status(200).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  let updatedTodo = dbInteractions.updateTodo(req.params.id, req.body.message);
  res.status(200).json(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
  let result = dbInteractions.deleteTodo(req.params.id);
  res.status(200).json({
    success: result
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
