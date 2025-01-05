<template>
  <v-card variant="elevated" :loading="loading" height="100%" elevation="10">
    <v-toolbar :height="200" :image="bgImg" class="pa-2" >
      <template #image>
      <v-img class="img-blur opacity-30"></v-img>
    </template>
      <template #prepend>
        <v-avatar size="150">
          <BaseImg
            :img-src="avatar || ''"
            :img-options="avatarImgOptions"
          ></BaseImg>
        </v-avatar>
      </template>
      <template #title>
        <div class="d-flex flex-column ga-1">
          <span
            class="text-body-1 text-md-h4 text-lg-h4 text-xl-h4 font-weight-bold"
            >{{ title }}</span
          >
          <span class="text-caption text-truncated text-lg-subtitle-1">
            {{ subtitle }}
          </span>
        </div>
      </template>
    </v-toolbar>
    <v-card-text v-if="!loading">
      <slot name="text"></slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import BaseImg from "../Img/BaseImg.vue";
defineEmits(["edit"]);
defineProps<{
  title?: string;
  subtitle?: string;
  bgImg?: string;
  avatar?: string;
  loading?: boolean;
}>();

const avatarImgOptions = {
  height: 160,
  placeholderOptions: {
    displayTitle: true,
  },
} as ImgOptions;
</script>
