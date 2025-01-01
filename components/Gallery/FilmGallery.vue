<template>
  <v-avatar v-if="galleryContent.length" :size="130" variant="tonal" rounded="lg" class="ma-3">
    <BaseImg
      
      :img-src="galleryContent[0] || ''"
      :img-options="posterOptions"
      @click="showGalleryDialogOnClick"
    />
  </v-avatar>
  <v-sheet
    v-else
    :height="600"
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
  <v-dialog v-model="showGalleryDialog" max-width="1024">
    <v-card rounded="lg" variant="elevated" elevation="10">
      <v-toolbar>
        <v-toolbar-title>
          {{ name }}:
          <span class="text-lowercase">{{ $t("pages.films.gallery") }}</span>
        </v-toolbar-title>
        <div class="d-flex ga-2 mr-5">
          <v-btn icon :disabled="!galleryContent.length" @click="$emit('img:download', galleryContent[activeImg])">
            <v-icon icon="mdi-download"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.download") }}
            </v-tooltip>
          </v-btn>
          <v-btn icon :disabled="!galleryContent.length" @click="$emit('img:share', galleryContent[activeImg])">
            <v-icon icon="mdi-share"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.share") }}
            </v-tooltip>
          </v-btn>
          <v-btn icon :disabled="!galleryContent.length" @click="$emit('img:edit', galleryContent[activeImg])">
            <v-icon icon="mdi-pencil"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.edit") }}
            </v-tooltip>
          </v-btn>
          <v-btn icon :disabled="!galleryContent.length" @click="$emit('img:delete', galleryContent[activeImg])">
            <v-icon icon="mdi-delete" color="error"></v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.remove") }}
            </v-tooltip>
          </v-btn>
        </div>
        <CloseBtn @click="showGalleryDialog = false" />
      </v-toolbar>

      <v-card-text>
        <v-window v-model="activeImg" show-arrows>
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
      </v-card-text>
      <div class="d-flex align-center justify-center">
        <v-label class="text-caption">{{
          $t("general.img") +
          " #" +
          (galleryContent.length > 0 ? activeImg + 1 : 0) +
          " " +
          $t("general.of") +
          " " +
          galleryContent.length
        }}</v-label>
      </div>
      <v-card-actions
        class="d-flex align-center justify-space-between"
        v-if="galleryContent.length"
      >
        <v-btn
          icon
          :disabled="!galleryContent.length || activeImg === 0"
          @click="prev"
          ><v-icon icon="mdi-chevron-left"></v-icon
        ></v-btn>
        <v-item-group v-model="activeImg" class="text-center" mandatory>
          <v-item
            v-if="galleryContent.length"
            v-for="n in galleryContent.length"
            :key="`btn-${n}`"
            v-slot="{ isSelected, toggle }"
            :value="n - 1"
          >
            <v-btn
              density="compact"
              size="small"
              :color="isSelected ? 'accent' : 'grey-darken-3'"
              :variant="isSelected ? 'outlined' : 'text'"
              icon="mdi-record"
              @click="toggle"
            ></v-btn>
          </v-item>
        </v-item-group>
        <v-btn
          :disabled="
            !galleryContent.length || activeImg === galleryContent.length - 1
          "
          icon
          @click="next"
          ><v-icon icon="mdi-chevron-right"></v-icon
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import BaseImg from "../Containment/Img/BaseImg.vue";
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
defineEmits(["img:download", "img:share", "img:edit", "img:delete"]);
const props = defineProps<{
  galleryContent: string[];
  noContentLabel?: string;
  name?: string;
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
  if (activeImg.value < props.galleryContent.length - 1) {
    activeImg.value =
      activeImg.value < props.galleryContent.length - 1
        ? activeImg.value + 1
        : 0;
  } else {
    activeImg.value = 0;
  }
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
