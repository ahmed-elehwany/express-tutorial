// Importing necessary packages + necessary boilerplate
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();
app.use(bodyParser.json());
app.use(cors())

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
  dbInteractions.getTodo(req.params.id)
    .then((todo) => {
      return res.status(200).json(todo);
    })
    .catch(error => {
      return res.status(404).json({
        msg: error
      });
    })
});

// POST /todos creates a new todo and returns it
// @params:
//     - "message" in the body
app.post("/todos", (req, res) => {
  dbInteractions.createTodo(req.body.message)
    .then(newTodo => {
      return res.status(200).json(newTodo);
    })
    .catch(error => {
      return res.status(500).json({
        msg: error
      })
    })
});

// PUT /todos/:id updates the message of a todo and returns the todo
// @params:
//     - "id" in the path
//     - "message" in the body
app.put("/todos/:id", (req, res) => {
  dbInteractions.updateTodo(req.params.id, req.body.message)
    .then(updatedTodo => {

      return res.status(200).json(updatedTodo);
    })
    .catch(error => {
      return res.status(404).json({
        msg: error
      })
    })
});

// DELETE /todos/:id deletes a todo and returns "success": true or false
// @params:
//     - "id" in the path
app.delete("/todos/:id", (req, res) => {
  let result = dbInteractions.deleteTodo(req.params.id)
    .then(result => {
      res.status(200).json({
        success: result
      });
    })
    .catch(error => {
      return res.status(404).json({
        success: false,
        msg: error
      })
    })
});

// Initializes the server on a certain PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
