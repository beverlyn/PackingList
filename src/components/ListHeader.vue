<script setup lang="ts">
import { useListStore } from "../store/useListStore.js";
import { ref } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const listID = Number(route.params.id);

const inputDisabled = ref(false); // State of input

const store = useListStore();
const list = store.lists.find((list) => list.id === listID);
const listName = list.name;
const categoryName = ref('');

function addList(item: string) {
  if (item.length === 0) {
    return;
  }
  store.addList(item);
  // Disable the input after hitting Enter
  inputDisabled.value = true;
}

const clearInputField = () => {
    categoryName.value = '';
};

function editListName(item: number, newName:string) {
	store.editListName(item, newName)
}
</script>

<template>
<div class="flex">
	{{categoryName }}
	<div>
	<!-- :disabled: Disable input if true  -->
		<input 
			:disabled="inputDisabled"
			v-model = "categoryName" 
			:placeholder="listName"
			@keyup.enter = "editListName(listID, categoryName)"
			@blur="editListName(listID, categoryName)"
			class="bg-transparent font-bold text-[20px] rounded px-[8px] text-black"
			:class="{ 'disabled': inputDisabled }"
			id="headerInput"
		/>
		<button 
			@click="clearInputField">		
			<IconPajamasClear 
			class="text-gray-500 self-center mx-[8px]"
			:class="inputDisabled ? 'hidden' : 'block'"
			/>
		</button>
	</div>

	<button @click="inputDisabled = !inputDisabled">
		<IconMaterialSymbolsEditSquareOutline 
		:class="inputDisabled ? 'block' : 'hidden'"
	/>
	</button>

</div>
</template>

<style>
.disabled {
	cursor: not-allowed;
	background-color: white;
}
</style>