<template>
  <v-hover :disabled="!imgSrc || !imgOptions.removable">
    <template #default="{ props, isHovering }">
      <v-img
        :src="imgSrc || ''"
        rounded="lg"
        width="100%"
        v-bind="{
          ...imgOptions,
          ...props,
        }"
        :gradient="imgOptions.shaded || isHovering ? gradientStr : undefined"
        :cover="imgOptions.cover"
        :class="[
          'position-relative',
          imgOptions.class,
          { 'cursor-pointer': imgOptions.clickable || imgOptions.removable },
        ]"
        :aspect-ratio="imgOptions.aspectRatio"
        @click="$emit('click')"
      >
        <template #placeholder>
          <ImgPlaceholder v-bind="imgOptions.placeholderOptions" />
        </template>
        <template #error>
          <v-sheet class="d-flex flex-column align-center justify-center fill-height">
            <v-icon icon="mdi-image-off" color="error" size="small"></v-icon>
  
          </v-sheet>
        </template>
        <v-expand-transition v-if="imgOptions.removable">
          <div
            v-if="isHovering"
            class="d-flex transition-ease-in-ease-in-out v-card--reveal"
            style="height: 100%"
          >
            <v-btn
              color="error"
              class="opacity-90"
              block
              prepend-icon="mdi-close"
              @click.prevent.stop="$emit('remove')"
            >
              {{ $t("actions.remove") }}
            </v-btn>
          </div>
        </v-expand-transition>
      </v-img>
    </template>
  </v-hover>
</template>

<script lang="ts" setup>
defineEmits(["remove", "click"]);
import ImgPlaceholder from "./ImgPlaceholder.vue";
defineProps<{
  imgSrc: string;
  imgOptions: ImgOptions;
}>();

const FIRST_COLOR = "rgba(0, 0, 0, 0.4)";
const SECOND_COLOR = "rgb(45, 45, 45, 0.5)";
const gradientStr = `to bottom, ${FIRST_COLOR}, ${SECOND_COLOR}`;
</script>

<style lang="scss" scoped>
$firstColor: rgba(148, 148, 148, 0.2);
$secondColor: rgba(165, 165, 165, 0.1);
</style>
