<template>
  <v-card variant="elevated" :image="bgImg" :loading="loading">
    <template #image>
      <v-img
        class="img-blur"
        gradient="135deg, rgba(0, 0, 0, 0.6) 0%,  rgb(0, 0, 0, 0.8) 100%"
      ></v-img>
    </template>
    <v-toolbar
      :height="100"
      class="card-header pa-2"
      @click="$emit('edit')"
    >
      <template #prepend>
        <v-avatar size="100" variant="tonal">
          <BaseImg
            :img-src="avatar || ''"
            :img-options="avatarImgOptions"
          ></BaseImg>
        </v-avatar>
      </template>
      <template #title>
        <div class="d-flex flex-column ga-1">
          <span
            class="text-h5 text-md-h4 text-lg-h4 text-xl-h4 font-weight-bold"
            >{{ title }}</span
          >
          <span class="text-subtitle-1">
            {{ subtitle }}
          </span>
        </div>
      </template>
    </v-toolbar>
    <v-card-text>
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
