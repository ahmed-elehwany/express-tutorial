const express = require("express"),
  bodyParser = require("body-parser");
const PORT = 3000;

let todos = [
  {
    id: "1",
    message: "Do groceries",
    createdAt: Date.now().toString()
  },
  {
    id: "2",
    message: "Clean room",
    createdAt: Date.now().toString()
  },
  {
    id: "3",
    message: "Walk dog",
    createdAt: Date.now().toString()
  }
];

let idNum = todos.length;

const app = express();
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todo = todos.filter(todo => todo.id == req.params.id);
  res.status(200).json(todo);
});

app.post("/todos", (req, res) => {
  idNum++;
  let newTodo = {
    id: idNum,
    message: req.body.message,
    createdAt: Date.now().toString()
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id");

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
