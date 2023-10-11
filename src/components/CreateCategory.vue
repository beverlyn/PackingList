<!-- 
    Creates a div for each list containing the list name
    and the number of items in the list.
    Also includes a collapsible menu that allows users to
    delete the list or edit the list name.
 -->

<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import type { OnClickOutsideHandler } from '@vueuse/core';
import { useListStore } from "../store/useListStore.js";
import { useFloating, offset, flip, autoUpdate } from '@floating-ui/vue';

const props = defineProps({
    listID: Number,
    listName: String,
    listCount: Number,
});

// Drop down menu for each list div
const showMenu = ref(false);
const toggleNav = () => {
    showMenu.value = !showMenu.value;
};

const dropdownHandler: OnClickOutsideHandler = (event) => {
    showMenu.value = false;
}

const store = useListStore();
const removeList = (listID) => {
	store.removeList(listID);
};

const inputDisabled = ref(true); // State of input
const categoryName = ref(props.listName);
const toggleInput = () => {
    inputDisabled.value = !inputDisabled.value;
};
const editListName = (listID, newListName) => {
    store.editListName(listID, newListName);
}

// Allows for the placement of the dropdown menu in relation to menu button
const reference = ref(null);
const floating = ref(null);

const {floatingStyles} = useFloating(reference, floating,{
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip()],
});

</script>

<template>
<div
    class="
    w-[300px] p-[18px]
    bg-white rounded-2xl
    text-black
    flex justify-between"
>
    <div class="grid grid-cols-1">
        <span>
            <input 
			:disabled="inputDisabled"
			v-model = "categoryName" 
			@keyup.enter = "editListName(listID, categoryName)"
			@blur="editListName(listID, categoryName)"
			class="bg-transparent font-bold text-[20px] rounded px-[8px] text-black"
			:class="{ 'disabled': inputDisabled }"
			id="headerInput"
		/>
        
        </span>
        <span class="text-gray-500 pl-[8px]"> 
            <span v-if="listCount == 1">
                1 Item
            </span>
            <span v-else>
                {{ listCount }} Items 
            </span>
        </span>
    </div>

    <div>
        <button
            ref="reference"
            @click.stop.prevent="toggleNav" 
            type="button"
        >
            <template v-if="showMenu">
                <IconMingcuteMore2Fill class="bg-green-300 rounded-full"/>
            </template>
            <template v-else>
                <IconMingcuteMore2Fill/>
            </template>
        </button>

        <div v-if="showMenu"
            ref="floating"
            :style="floatingStyles"
            v-on-click-outside.bubble="dropdownHandler"
            class="
                absolute
                top-0 left-0
                grid grid-cols-1 
                border-2 border-gray-300 
                bg-white
                rounded-md 
                leading-8 
                divide-y 
                content-center
                w-fit
                space-between
                px-[8px]"
        >
            <button @click.stop.prevent="toggleInput"
            class="flex gap-2 hover:bg-gray-200">
                <IconMaterialSymbolsEditSquareOutline class="self-center"/>
                Edit Name 
            </button>
            <button @click.stop.prevent="removeList(listID)" class="flex gap-2 hover:bg-gray-200">
                <IconMingcuteDelete2Fill class="self-center"/>
                Delete List 
            </button>
        </div>
    </div>
</div>
</template>