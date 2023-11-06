import { reactive } from 'vue';
import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core';

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

type List = {
	id: number;
	name: string;
	dateCreated: Date;
	dateEdited: Date;
	todos: Todo[];
}

// 	const lists: List[] = useLocalStorage("lists", reactive([
export const useListStore = defineStore("listName", () => {
	// const lists = useLocalStorage("lists", reactive([ 
	// 		{
	// 			id: 1,
	// 			name: "Grocery List",
	// 			dateCreated: new Date(),
	// 			dateEdited: new Date(),
	// 			todos: [
	// 				{
	// 					id: 1,
	// 					text: "Eggs",
	// 					completed: false
	// 				},
	// 				{
	// 					id: 2,
	// 					text: "Carrots",
	// 					completed: false
	// 				},
	// 				{
	// 					id: 3,
	// 					text: "Cheese",
	// 					completed: false
	// 				},
	// 			]
	// 		}
	// 	]));
	const lists = useLocalStorage("lists", reactive<List[]>([]));

		const addList = (
			ID: number
		) => {
			lists.value.push({ id: ID, name: "To Do List", dateCreated: new Date(), dateEdited: new Date(), todos: [] });
		};

		const removeList = (
			listID: number
		) => {
			const index = lists.value.findIndex((list) => list.id === listID);
			if (index !== -1) {
				lists.value.splice(index, 1);
			}
		};

		const editListName = (
			listID: number, 
			newListName: string
		) => {
			const list = lists.value.find((list) => list.id === listID);
			if (list) {
				list.name = newListName;
				list.dateEdited = new Date();
			} else {
				console.error(`List with ID ${listID} not found.`);
			}
		};

		const addTodoItem = (
			listID: number,
			newItem: string,
		) => {
			const list = lists.value.find((list) => list.id === listID);
			if (list) {
				const id = list.todos.length + 1;
				const newTodo: Todo = {
					id,
					text: newItem,
					completed: false,
				};
				list.todos.push(newTodo);  
			}
		};

		const removeTodoItem = (
			listID: number, 
			todoID: number
		) => {
			const list = lists.value.find((list) => list.id === listID);
			if (list) {
				const index = list.todos.findIndex((todo) => todo.id === todoID);
				if (index !== -1) {
					list.todos.splice(index, 1);
				}
			}
		};

		const editToDoItem = (
			listID: number, 
			todoID: number, 
			newToDo: string
		) => {
			const list = lists.value.find((list) => list.id === listID);
			if (list) {
				const todo = list.todos.find((todo) => todo.id === todoID);
				if (todo) {
					todo.text = newToDo;
				} else {
					console.error(`Todo with ID ${todoID} not found.`);
				}
			}
		};

		const toggleCompleted = (
			listID: number, 
			todoID: number
		) => {
			const list = lists.value.find((list) => list.id === listID);
			if (list) {
				const todo = list.todos.find((todo) => todo.id === todoID);
				if (todo) {
					todo.completed = !todo.completed;
				} else {
					console.error(`Todo with ID ${todoID} not found.`);
				}
			}
		};

		const listCount = () => {
			return lists.value.length;
		};

	return {
		lists,
		addList,
		removeList,
		editListName,
		addTodoItem,
		removeTodoItem,
		editToDoItem,
		toggleCompleted,
		listCount, 
	};
});

// export const useListStore = defineStore("listName", {
//   state: () => ({
//     lists: [
//       {
//         id: 1,
//       name: "Grocery List",
//       dateCreated: new Date(),
//       dateEdited: new Date(),
//       todos: [
//         {
//           id: 1,
//           text: "Eggs",
//           completed: false
//         },
//         {
//           id: 2,
//           text: "Carrots",
//           completed: false
//         },
//         {
//           id: 3,
//           text: "Cheese",
//           completed: false
//         },
//       ]
//     }
//     ],
//   }),
//   actions: {
//     addList(ID) {
//       this.lists.push({ id: ID, name: "To Do List", dateCreated: new Date(), dateEdited: new Date(), todos: [] });
//     },
//     removeList(listId) {
//       this.lists = this.lists.filter((list) => list.id !== listId);
//     },
//     editListName(listId, newListName) {
//       const list = this.lists.find((list) => list.id === listId);
//       if (list) {
//         list.name = newListName;
//         list.dateEdited = Date();
//       } else {
//         console.error(`List with ID ${listId} not found.`);
//       }
//     },
//     addTodoItem(listID, newItem) {
//       const list = this.lists.find((list) => list.id === listID);
//       const newTodo = { id: new Date(), text: newItem, completed: false };
// 		  list.todos.push(newTodo);
//     },
//     removeTodoItem(listID, todoID) {
//       const list = this.lists.find((list) => list.id === listID);
//       list.todos = list.todos.filter((todo) => todo.id !== todoID);
//     },
//     editToDoItem(listID, todoID, newToDo) {
//       const list = this.lists.find((list) => list.id === listID);
//       const todo = list.todos.find((todo) => todo.id === todoID);
//       if (todo) {
//         todo.text = newToDo;
//       } else {
//         console.error(`Todo with ID ${todoID} not found.`);
//       }
//     },
//     toggleCompleted(listID, todoID) {
//       const list = this.lists.find((list) => list.id === listID);
//       const todo = list.todos.find((todo) => todo.id === todoID);
//       if (todo) {
//         todo.completed = !todo.completed;
//       } else {
//         console.error(`Todo with ID ${todoID} not found.`);
//       }
//     },
//   },
//   getters: {
//     listCount() {
//       return this.lists.length;
//     },
//     getListName(listID) {
//       const list = this.lists.find((list) => list.id === listID);
//       return list.name;
//     },
//   }
// });