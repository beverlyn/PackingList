<script setup lang="ts">
import { ref, computed } from 'vue';
import ListHeader from '../components/ListHeader.vue';
import individualToDoItem from '../components/individualToDoItem.vue';
import { useRoute } from 'vue-router';
import { useListStore } from '../store/useListStore';

const todoText = ref('');
const store = useListStore();
const newTodoText = ref('');

const route = useRoute();
const listID = Number(route.params.id);

const todos = computed(() => {
	const list = store.lists.find((list) => list.id === listID);
	return list.todos;
})

function addItemAndClear(listID: number, newTodo: string) {
	if (newTodo.length === 0) {
		return;
	}
	store.addTodoItem(listID, newTodo);
	todoText.value = '';
}

function getListCount(item: Number) {
	const list = store.lists.find((list) => list.id === item);
	return list.todos.length;
}
</script>

<template>
<router-link  
:to="{ path: `/` }" 
>
	<IconMingcuteArrowLeftFill 
		class="
		mx-[16px] 
		mb-[16px] 
		text-[32px]"
	/>
</router-link>

<div 
	class="
	bg-white 
	h-screen 
	w-screen 
	p-[16px] 
	rounded-xl 
	text-black"
>
	<ListHeader/>

	<span>
		{{ getListCount(listID) }} Items
	</span>

	<div 
		class="
		leading-8 
		divide-y"
	>
		<ul class="divide-y">   
			<li 
				v-for="todo in todos" 
				:key="todo.id" 
				:class="{ completed: todo.completed }" 
				class="flex gap-[8px]"
			>
				<individualToDoItem 
					:listID="listID"
					:todoID="todo.id"
					:todoItem="todo.text"
				/>
			</li>
		</ul>
		<div 
			class="
			flex 
			content-center 
			gap-[8px]"
		>
			<IconMingcuteAddCircleLine 
				class="self-center text-gray-400"
			/>
			<input 
				v-model = "todoText" 
				@keyup.enter = "addItemAndClear(listID, todoText)"
				@blur = "addItemAndClear(listID, todoText)"
				placeholder = "Add Item" 
				class="rounded-md bg-transparent border-transparent"
			/>
		</div>
	</div>
</div>
</template>

<style>
.completed {
	text-decoration: line-through;
}
</style>
	 