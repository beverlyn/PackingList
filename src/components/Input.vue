<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false
})

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const clearInputField = () => {
    emit('update:modelValue', '');
};

const isFocused = ref(false);

const inputText = ref(null)
const enterAction = (event: KeyboardEvent) => {
    if (inputText.value) {
        inputText.value.blur()
    }
};
</script>

<template>
    <div class="relative">
        <input 
            ref = "inputText"
            class="w-full"
            :value="modelValue"
            placeholder="Enter List Header"
            @keyup.enter = "enterAction"
            @input = "$emit('update:modelValue', $event.target.value)"
            @focus = "isFocused = true"
            @blur = "isFocused = false"
            v-bind = "$attrs"
        />
        <button
            v-if="isFocused"
            class="absolute right-0 top-1/2 -translate-y-1/2"
            @mousedown.prevent="clearInputField">		
            <IconPajamasClear 
                class="text-gray-500 self-center mx-[8px]"
            />
        </button>
    </div>
</template>