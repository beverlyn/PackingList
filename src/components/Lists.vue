<!-- 
	Creates a list on the main page of all the list names
	Each div will contain list name along with the number of
	to-do items in the list.
 -->

<script setup>
import { computed } from 'vue';
import { useListStore } from "../store/useListStore.js";
import CreateCategory from "./CreateCategory.vue";

const store = useListStore();
const lists = computed(() => {
	return store.lists;
})

</script>

<template>
<div>
	<ul class="grid grid-col-1 gap-4">
		<li v-for="list in lists" :key="list.id">
			<router-link  
				:to="{ path: `/lists/${list.id}` }" 
			>
				<CreateCategory 
					:listID="list.id"
					:listName="list.name" 
					:listCount="list.todos.length"/>
			</router-link>
			
		</li>
	</ul>
</div>
</template>