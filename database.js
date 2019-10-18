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

  getTodo: (id) => {
    return new Promise((resolve, reject) => {
      let result = todos.filter(todo => todo.id == id)
      if (result.length < 1) {
        reject(`document with id ${id} not found`)
      }
      resolve(result[0])
    });
  },

  createTodo: message => {
    idNum++;
    let newTodo = {
      id: idNum,
      message: message,
      createdAt: Date.now().toString()
    };
    return new Promise((resolve, reject) => {
      todos.push(newTodo)
      resolve(newTodo);
    })
  },

  updateTodo: (id, message) => {
    return new Promise((resolve, reject) => {
      let i = todos.findIndex(todo => todo.id == id);
      if (i === -1) {
        reject(`document with id ${id} not found`)
      }
      todos[i].message = message;
      resolve(todos[i])
    })
  },

  deleteTodo: id => {
    const before = todos.length
    todos = todos.filter(todo => todo.id != id);
    return new Promise((resolve, reject) => {
      if (before === todos.length) {
        reject(`document with id ${id} not found and not deleted`)
      }
      resolve(true)
    })
  }
};
