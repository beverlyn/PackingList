//Store for separate lists

//valueOf for comparing
import { defineStore } from "pinia";

export const useListStore = defineStore("listName", {
  state: () => ({
    lists: [
      {
        id: 1,
      name: "Grocery List",
      dateCreated: new Date(),
      dateEdited: new Date(),
      todos: [
        {
          id: 1,
          text: "Eggs",
          completed: false
        },
        {
          id: 2,
          text: "Carrots",
          completed: false
        },
        {
          id: 3,
          text: "Cheese",
          completed: false
        },
      ]
    }
    ],
  }),
  actions: {
    addList(ID) {
      this.lists.push({ id: ID, name: "New List", dateCreated: new Date(), dateEdited: new Date(), todos: [] });
    },
    removeList(listId) {
      this.lists = this.lists.filter((list) => list.id !== listId);
    },
    editListName(listId, newListName) {
      const list = this.lists.find((list) => list.id === listId);
      if (list) {
        list.name = newListName;
        list.dateEdited = Date();
      } else {
        console.error(`List with ID ${listId} not found.`);
      }
    },
    addTodoItem(listID, newItem) {
      const list = this.lists.find((list) => list.id === listID);
      const newTodo = { id: new Date(), text: newItem, completed: false };
		  list.todos.push(newTodo);
    },
    removeTodoItem(listID, todoID) {
      const list = this.lists.find((list) => list.id === listID);
      list.todos = list.todos.filter((todo) => todo.id !== todoID);
    },
    editToDoItem(listID, todoID, newToDo) {
      const list = this.lists.find((list) => list.id === listID);
      const todo = list.todos.find((todo) => todo.id === todoID);
      if (todo) {
        todo.text = newToDo;
      } else {
        console.error(`Todo with ID ${todoID} not found.`);
      }
    },
    toggleCompleted(listID, todoID) {
      const list = this.lists.find((list) => list.id === listID);
      const todo = list.todos.find((todo) => todo.id === todoID);
      if (todo) {
        todo.completed = !todo.completed;
      } else {
        console.error(`Todo with ID ${todoID} not found.`);
      }
    },
  },
  getters: {
    listCount() {
      return this.lists.length;
    },
    getListName(listID) {
      const list = this.lists.find((list) => list.id === listID);
      return list.name;
    },
  }

});
