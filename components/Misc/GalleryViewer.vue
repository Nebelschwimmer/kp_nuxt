<template>
  <v-dialog :model-value="showGallery" fullscreen>
    <v-sheet>
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
          <CloseBtn @click="$emit('close')" />
        </v-toolbar-items>
      </v-toolbar>


      <v-card-text>
        <v-carousel
          :model-value="activeImg"
          touch
          color="accent"
          progress="accent"
          height="800"
        
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
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
defineEmits(["img:download", "img:share", "img:edit", "img:delete", "close"]);
defineProps<{
  showGallery: boolean;
  galleryContent: string[] | string;
  noContentLabel?: string;
  name?: string;
  activeImg: number;
}>();

const id = useRoute().params.id as string;

const showGalleryDialog = ref<boolean>(false);

</script>

<style></style>
