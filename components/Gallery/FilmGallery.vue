<template>
  <BaseImg
    :img-src="galleryContent[0] || ''"
    :img-options="posterOptions"
    @click="showGalleryDialogOnClick"
  />
  <v-dialog v-model="showGalleryDialog" max-width="1024">
    <v-card class="base-card" rounded="lg" height="800">
      <v-toolbar>
        <v-toolbar-title class="text-body-1"
          ><v-chip>{{
            $t("general.img") +
            " #" +
            (activeImg + 1) +
            " " +
            $t("general.of") +
            " " +
            galleryContent.length
          }}</v-chip></v-toolbar-title
        >

        <div class="d-flex ga-2 mr-5">
          <v-btn prepend-icon="mdi-download" variant="outlined">{{
            $t("actions.download")
          }}</v-btn>
          <v-btn prepend-icon="mdi-share" variant="outlined">{{
            $t("actions.share")
          }}</v-btn>
          <v-btn prepend-icon="mdi-delete" color="error" variant="outlined">{{
            $t("actions.remove")
          }}</v-btn>
        </div>
        <CloseBtn @click="showGalleryDialog = false" />
      </v-toolbar>

      <v-card-text>
        <v-window v-model="activeImg" v-if="galleryContent.length">
          <v-window-item
            v-for="(item, i) in galleryContent"
            :key="i"
            :value="i"
            @click="next"
          >
            <BaseImg
              :img-src="item"
              :img-options="galleryItemOptions"
            ></BaseImg>
          </v-window-item>
        </v-window>
        <v-sheet
          v-else
          height="600"
          class="d-flex flex-column ga-2 align-center justify-center"
        >
          <v-icon icon="mdi-image-off"></v-icon>
          <v-label>{{ noContentLabel }}</v-label>
          <v-btn
            prepend-icon="mdi-plus"
            color="accent"
            density="comfortable"
            :to="`/films/${id}/edit#gallery_upload`"
            >{{ $t("actions.add_img") }}</v-btn
          >
        </v-sheet>
      </v-card-text>
      <v-card-actions
        class="justify-space-between"
        v-if="galleryContent.length"
      >
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
        <v-item-group v-model="activeImg" class="text-center" mandatory>
          <v-item
            v-for="n in galleryContent.length"
            :key="`btn-${n}`"
            v-slot="{ isSelected, toggle }"
            :value="n - 1"
          >
            <v-btn
              density="compact"
              :color="isSelected ? 'accent' : 'grey-darken-3'"
              :variant="isSelected ? 'outlined' : 'text'"
              icon="mdi-record"
              @click="toggle"
            ></v-btn>
          </v-item>
        </v-item-group>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import BaseImg from "../Containment/Img/BaseImg.vue";
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
const props = defineProps<{
  galleryContent: string[];
  noContentLabel?: string;
}>();

const id = useRoute().params.id as string;

const showGalleryDialog = ref(false);
const activeImg = ref(0);
const showGalleryDialogOnClick = () => {
  showGalleryDialog.value = true;
};

const { t } = useI18n();
const prev = () => {
  if (activeImg.value > 0) {
    activeImg.value--;
  }
};
const next = () => {
  activeImg.value =
    activeImg.value < props.galleryContent.length - 1 ? activeImg.value + 1 : 0;
};

const posterOptions = {
  shaded: false,
  height: "100%",
  cover: true,
  clickable: true,
  aspectRatio: "16/9",
  placeholderOptions: {
    displayTitle: true,
    title: t("pages.films.no_preview"),
  },
};

const galleryItemOptions = {
  shaded: false,
  height: 600,
  cover: true,
  clickable: true,
  aspectRatio: "16/9",
  placeholderOptions: {
    displayTitle: false,
  },
};
</script>

<style></style>
