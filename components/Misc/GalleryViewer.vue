<template>
  <v-dialog :model-value="showGallery" fullscreen>
    <v-card variant="tonal" color="black">
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
      <v-empty-state
        v-if="!galleryContent.length || !galleryContent"
        :headline="noContentLabel"
        icon="mdi-image-off"
        class="d-flex flex-column ga-2 align-center justify-center"
      >
        <template #actions>
          <v-btn
            prepend-icon="mdi-plus"
            color="primary"
            variant="outlined"
            :to="`/films/${id}/edit#gallery_upload`"
            >{{ $t("actions.add_img") }}</v-btn
          >
        </template>
      </v-empty-state>

      <v-card-text v-else>
        <v-carousel
          v-model="activeImg"
          touch
          
          color="accent"
          progress="accent"
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
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
defineEmits(["img:download", "img:share", "img:edit", "img:delete", "close"]);
defineProps<{
  showGallery: boolean;
  galleryContent: string[] | string;
  noContentLabel?: string;
  name?: string;
}>();

const id = useRoute().params.id as string;

const showGalleryDialog = ref<boolean>(false);
const activeImg = ref<number>(0);
</script>

<style></style>
