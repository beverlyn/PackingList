<script setup lang="ts">
import { useListStore } from "../store/useListStore.js";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import Input from "./Input.vue";

const route = useRoute();
const listID = Number(route.params.id);

const store = useListStore();
const list = store.lists.find((list) => list.id === listID);
const listName = list.name;
const categoryName = ref(listName);

function editListName(item: number, newName:string) {
	store.editListName(item, newName);
}
</script>

<template>
<div class="flex">
	<div>
		<Input
			@keyup.enter = "editListName(listID, categoryName)"
			@blur="editListName(listID, categoryName)"
			v-model="categoryName"
			class="
			bg-transparent rounded pr-[8px]
			font-bold text-[20px] text-black"
		/>
	</div>
</div>
</template>