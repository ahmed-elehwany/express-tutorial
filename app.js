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
  // TODO: fill out functionality
});

// GET /todos/:id returns a specific todo by ID
// @params:
//     - "id" in the path
app.get("/todos/:id", (req, res) => {
  // TODO: fill out functionality
});

// POST /todos creates a new todo and returns it
// @params:
//     - "message" in the body
app.post("/todos", (req, res) => {
  // TODO: fill out functionality
});

// PUT /todos/:id updates the message of a todo and returns the todo
// @params:
//     - "id" in the path
//     - "message" in the body
app.put("/todos/:id", (req, res) => {
  // TODO: fill out functionality
});

// DELETE /todos/:id deletes a todo and returns "success": true or false
// @params:
//     - "id" in the path
app.delete("/todos/:id", (req, res) => {
  // TODO: fill out functionality
});

// Initializes the server on a certain PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
