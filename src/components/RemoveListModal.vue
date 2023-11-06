<template>
<div class="modal-mask">
    <div class="modal-container rounded-xl">
        <div class="text-[16px]">
            <slot name="header" />
        </div>
        <div class="text-[12px]">
            <slot name="body"/>
        </div>
        <div class="text-[16px] flex gap-[46px] justify-center mt-[16px]">
            <slot name="footer"/>
        </div>
    </div>
</div>
</template>

<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}
</style>