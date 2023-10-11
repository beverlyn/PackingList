<script setup lang="ts">
import { useListStore } from '../store/useListStore.js';
import { ref } from 'vue';

const props = defineProps({
    listID: Number,
    todoID: Number,
    todoItem: String,
})

const store = useListStore();
const list = store.lists.find((list) => list.id === props.listID);
const todo = list.todos.find((todo) => todo.id === props.todoID);
const newTodoText = ref(props.todoItem);

const toggleCompleted = (listID: number, todoID: number) => {
    store.toggleCompleted(listID, todoID);
}

const editToDo = (listID: number, todoID: number, newToDo: string) => {
    if (newToDo === "") {
        removeTodo(listID, todoID);
        return;
    }
    store.editToDoItem(listID, todoID, newToDo);
}

const removeTodo = (listID: number, todoID: number) => {
    store.removeTodoItem(listID, todoID);
}

// function removeTodo(todoId) {
//     store.removeTodo(todoId);
// }
</script>

<template>
    <span 
        @click="toggleCompleted(listID, todoID)" 
        class="self-center"
    >
         <!-- If item is not complete -->
        <template v-if="!todo.completed"> 
            <IconMdiCheckboxBlankCircleOutline/> 
        </template>
        <template v-else>
            <IconMingcuteCheckCircleLine/>
        </template>
    </span>
    <input 
        v-model = "newTodoText" 
        @keyup.enter = "editToDo(listID, todoID, newTodoText)"
        @blur="editToDo(listID, todoID, newTodoText)"
        class="bg-transparent"
    />
    <button @click="removeTodo(listID, todoID)">
        <IconMingcuteDelete2Fill/>
    </button>
</template>