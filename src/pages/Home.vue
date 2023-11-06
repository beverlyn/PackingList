<script setup lang="ts">
import Lists from "../components/Lists.vue";
import { useListStore } from "../store/useListStore.js";
import { useRouter } from 'vue-router';

const listStore = useListStore();
const router = useRouter();

function creatNewListID() {
    listStore.addList(listStore.lists.length + 1)
    const newList = listStore.lists[listStore.listCount() - 1];
    const newListId = newList.id; // Replace with the actual ID field

    // Use Vue Router to navigate to the new list's route
    router.push(`/lists/${newListId}`);
}
</script>

<template>
<div 
    class="
    px-[24px]
    relative"
>
	<!-- <IconMingcuteSettings3Fill 
		class="
        text-[36px]"
    /> -->
	<span 
        class="
        font-bold 
        text-[36px]"
    >
		Hello, Name
	</span>

	<button
		v-if="listStore.listCount() === 0" 
		class="
		border-2 border-[#2f4e31] rounded-xl 
		flex flex-col gap-[4px] place-items-center 
		p-[16px] w-full
		bg-[#84ae88]"
        @click="creatNewListID"
	>
		<IconMingcuteAddCircleFill 
            class="
            text-[30px]"
        />
		<span 
            class="
            text-[#2f4e31] 
            font-bold"
        >
            Create New List
        </span>
    </button>
	
	<div v-else>
		<IconMingcuteAddCircleFill 
            class="
            text-[#2f4e31]
            text-[36px]
            absolute
            top-[4px]
            right-[48px]"
            @click="creatNewListID"
        />
	</div>
    <Lists/>
</div>
</template>
