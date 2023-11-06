<!-- 
    Collapsible menu that allows users to
    delete the list or remove completed items
 -->

<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import type { OnClickOutsideHandler } from '@vueuse/core';
import { useListStore } from "../store/useListStore.js";
import { useFloating, offset, flip, autoUpdate } from '@floating-ui/vue';
import { useRouter } from 'vue-router';
import RemoveListModal from './RemoveListModal.vue';

defineProps({
    listID: Number,
});

const showModal = ref(false);
const router = useRouter();

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
    router.push(`/`);
	
};

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
<div>
    <button
        ref="reference"
        @click.stop.prevent="toggleNav" 
        type="button"
    >
        <template v-if="showMenu">
            <IconMingcuteMore2Fill 
                class="
                bg-green-300 
                rounded-full
                text-[24px]"
            />
        </template>
        <template v-else>
            <IconMingcuteMore2Fill class="text-[24px]"/>
        </template>
    </button>

    <div v-if="showMenu"
        ref="floating"
        :style="floatingStyles"
        v-on-click-outside.bubble="dropdownHandler"
        class="
            absolute top-0 left-0
            grid grid-cols-1 space-between content-center
            border-2 border-gray-300 
            bg-white rounded-md px-[8px]
            leading-8 
            divide-y 
            w-fit"
    >
        <button 
            @click="showModal = true"
            class="flex gap-2 hover:bg-gray-200 text-[20px]">
            <IconMingcuteDelete2Fill class="self-center"/>
            Delete List 
        </button>
    </div>
</div>

<RemoveListModal 
    v-if="showModal">
    <template v-slot:header>
        Delete list?
    </template>

    <template v-slot:body>
        This action can't be undone
    </template>
    <template v-slot:footer>
        <button @click="showModal = false">
            No
        </button>
        <button @click="removeList(listID)">
            Yes
        </button>
    </template>
</RemoveListModal>

</template>

<!-- @close="showModal = false" -->