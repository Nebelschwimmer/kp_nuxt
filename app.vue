import { _transform } from './.nuxt/types/tailwind.config';
<template>
    <div>
      <NuxtLayout>
          <div>
            <NuxtPage />
          </div>
      </NuxtLayout>
    </div>

</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
 transform: translateX(100%);
}


.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

</style>
