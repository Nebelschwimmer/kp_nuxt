<template>
 
    <v-avatar
      variant="tonal"
      rounded="lg"
      size="100"
      class="ma-3 cursor-pointer"
      @click="showGalleryDialogOnClick"
    >
      <BaseImg
        v-if="galleryContent.length && galleryContent[0]"
        :img-src="galleryContent[0] || ''"
        :img-options="posterOptions"
      />
      <v-icon v-else icon="mdi-image-off"></v-icon>
    </v-avatar>
 
  <v-dialog v-model="showGalleryDialog" fullscreen>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          {{ name }}:
          <span class="text-lowercase">{{ $t("pages.films.gallery") }}</span>
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            icon
            :disabled="!galleryContent.length"
            @click="$emit('img:download', galleryContent[activeImg])"
          >
            <v-icon icon="mdi-download"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.download") }}
            </v-tooltip>
          </v-btn>
          <v-btn
            icon
            :disabled="!galleryContent.length"
            @click="$emit('img:share', galleryContent[activeImg])"
          >
            <v-icon icon="mdi-share"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.share") }}
            </v-tooltip>
          </v-btn>
          <v-btn
            icon
            :disabled="!galleryContent.length"
            @click="$emit('img:edit', galleryContent[activeImg])"
          >
            <v-icon icon="mdi-pencil"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.edit") }}
            </v-tooltip>
          </v-btn>
          <v-btn
            icon
            :disabled="!galleryContent.length"
            @click="$emit('img:delete', galleryContent[activeImg])"
          >
            <v-icon icon="mdi-delete" color="error"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.remove") }}
            </v-tooltip>
          </v-btn>
          <CloseBtn @click="showGalleryDialog = false" />
        </v-toolbar-items>
      </v-toolbar>
      <v-sheet
        v-if="!galleryContent.length || !galleryContent"
        height="100%"
        class="d-flex flex-column ga-2 align-center justify-center"
      >
        <v-chip color="secondary" prepend-icon="mdi-image-off">
          {{ noContentLabel }}</v-chip
        >
        <v-btn
          prepend-icon="mdi-plus"
          color="primary"
          variant="outlined"
          :to="`/films/${id}/edit#gallery_upload`"
          >{{ $t("actions.add_img") }}</v-btn
        >
      </v-sheet>

      <v-card-text v-else>
        <v-carousel
          v-model="activeImg"
          touch
          show-arrows="hover"
          hide-delimiters
          progress="primary"
          height="800"
          @update:model-value="activeImg = $event"
        >
          <v-carousel-item
            v-for="(item, i) in galleryContent"
            :key="i"
            :value="item"
            :src="item"
          >
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import BaseImg from "../Containment/Img/BaseImg.vue";
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
defineEmits(["img:download", "img:share", "img:edit", "img:delete"]);
const props = defineProps<{
  galleryContent: string[] | string;
  noContentLabel?: string;
  name?: string;
}>();

const id = useRoute().params.id as string;

const showGalleryDialog = ref(false);
const activeImg = ref(0);
const showGalleryDialogOnClick = () => {
  showGalleryDialog.value = true;
};

const posterOptions = {
  shaded: false,
  height: "100%",
  cover: true,
  clickable: true,
  aspectRatio: "16/9",
  placeholderOptions: {
    displayTitle: false,
  },
};

const galleryItemOptions = {
  shaded: false,
  height: 600,
  cover: false,
  clickable: true,
  aspectRatio: "16/9",
  placeholderOptions: {
    displayTitle: false,
  },
};
</script>

<style></style>
