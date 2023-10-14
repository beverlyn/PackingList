import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(todoText) {
		const newTodo = { id: Date.now(), text: todoText, completed: false };
		this.todos.push(newTodo);
    },
    removeTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
	toggleCompleted(todoId) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo) {
		  todo.completed = !todo.completed;
		} else {
			console.error(`Todo with ID ${todoId} not found.`);
		}
	},
	editToDo(todoId, newToDo) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo) {
		  todo.text = newToDo;
		} else {
			console.error(`Todo with ID ${todoId} not found.`);
		}
	}
  },
  getters: {
    // Count completed todos
	todoCount() {
		return this.todos.length;
	  },
    completedTodoCount() {
      return this.todos.filter((todo) => todo.completed).length;
    },
  },
});