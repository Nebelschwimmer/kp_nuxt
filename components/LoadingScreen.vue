<template>
  <div class="flex flex-col p-5 gap-2 flex-calign-center justify-center overlay">
    <span>{{ $t("state.loading") }}...</span>
      <span class="progress w-1/2 mx-auto"></span>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(165, 165, 165, 0.2);
  z-index: 9996;
  display: flex;
  justify-content: center;
  align-items: center;
}


.progress {
  height: 10px;
  opacity: 0.1;
  background-color: #673ab7;
  animation: progressBar 1s ease-in-out infinite;
  animation-fill-mode: both;
}

@keyframes progressBar {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
