let todos = [
  {
    id: 1,
    message: "Do groceries",
    createdAt: Date.now().toString()
  },
  {
    id: 2,
    message: "Clean room",
    createdAt: Date.now().toString()
  },
  {
    id: 3,
    message: "Walk dog",
    createdAt: Date.now().toString()
  }
];

let idNum = todos.length;

module.exports = {
  getTodos: () => {
    return todos;
  },

  getTodo: () => {
    return todos.filter(todo => todo.id == req.params.id);
  },

  createTodo: message => {
    idNum++;
    let newTodo = {
      id: idNum,
      message: message,
      createdAt: Date.now().toString()
    };
    todos.push(newTodo);
    return newTodo;
  },

  updateTodo: (id, message) => {
    let i = todos.findIndex(todo => todo.id == id);
    todos[i].message = message;
    return todos[i];
  },

  deleteTodo: id => {
    todos = todos.filter(todo => todo.id != id);
    return true;
  }
};
