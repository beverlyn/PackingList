<script setup lang="ts">

// defineProps(['modalValue'])
// const emit = defineEmits(['update:modalValue'])

const closeModal = () => {
    emit('update:modalValue', 'close');
};

</script>

<template>
<div class="modal-mask">
    <div class="modal-container rounded-xl">
        <slot name="header">
        </slot>
        <slot name="body">
        </slot>
        <slot name="footer">
        </slot>
    </div>
</div>
</template>

<style>
  /* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  display: table;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
} */

.modal-container {
    position: fixed;
    z-index: 9998;
  width: 300px;
  /* margin: 0px auto; */
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>