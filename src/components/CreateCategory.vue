<!-- 
    Creates a div for each list containing the list name
    and the number of items in the list.
 -->
<script setup lang="ts">
defineProps({
    listID: Number,
    listName: String,
    listCount: Number,
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
    <div 
        class="
        grid 
        grid-cols-1"
    >
        <span 
            class="
            font-bold 
            text-[20px]"
        >
            {{ listName }}
        </span>
        <span 
            class="
            text-gray-500 
            pl-[8px]"
        > 
            <span 
                v-if="listCount == 1">
                1 Item
            </span>
            <span v-else>
                {{ listCount }} Items 
            </span>
        </span>
    </div>
</div>
</template>