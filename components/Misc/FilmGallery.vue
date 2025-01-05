<template>
  <div>
    <v-card rounded="lg" class="pa-2 mb-3" max-width="100%">
        <v-banner
        v-if="editMode"
          rounded="lg"
          elevation="2"
          :color="computedGalleryEmptyCondition ? 'secondary' : 'error'"
          :icon="
            !computedGalleryEmptyCondition ? 'mdi-image-off' : 'mdi-information'
          "
          :text="
            !computedGalleryEmptyCondition
              ? $t('pages.films.no_gallery')
              : $t('pages.films.gallery_banner')
          "
        >
          <template #actions>
            <v-btn
              v-if="computedGalleryEmptyCondition"
              :disabled="!selected.length"
              color="error"
              prepend-icon="mdi-delete"
              @click="$emit('delete:selected')"
            >
              {{ $t("actions.remove") }}</v-btn
            >
          </template>
        </v-banner>
    
      <v-card-text>
        <v-slide-group v-if="!editMode">
          <v-slide-group-item
            v-for="(img, index) in sliderGalleryArr"
            :key="index"
            :value="index"
          >
            <v-card
              :height="SLIDER_HEIGHT"
              :width="SLIDER_HEIGHT - 50"
              class="ma-2"
              @click="openGalleryOnClick(index)"
            >
              <template #image>
                <BaseImg v-if="img" :img-src="img" :img-options="galleryImgOptions">
                </BaseImg>
                <v-sheet
                  v-else
                  rounded="lg"
                  color="transparent"
                  class="placeholder-img cursor-pointer"
                  width="100%"
                  height="100%"
                >
                  <ImgPlaceholder
                    display-title
                    :title="$t('general.available_for_upload')"
                  />
                </v-sheet>
              </template>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <v-item-group
          v-else
          multiple
          :model-value="selected"
          @update:model-value="$emit('update:selected', $event)"
        >
          <v-container>
            <v-row>
              <v-col
                cols="auto"
                v-for="(img, index) in sliderGalleryArr"
                :key="index"
              >
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                  <v-card
                    v-if="img"
                    :variant="isSelected ? 'tonal' : 'outlined'"
                    rounded="lg"
                    :color="isSelected ? 'error' : ''"
                    :class="['d-flex align-center justify-center', selectedClass]"
                    :height="SLIDER_HEIGHT"
                    :width="CARD_WIDTH"
                    :image="img"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div
                        v-if="isSelected"
                        :class="[
                          'd-flex fill-height w-100 flex-column align-center justify-center position-relative',
                          { 'bg-selected': isSelected },
                        ]"
                      >
                        <v-btn icon variant="tonal" color="white">
                          <v-icon size="x-large" class="position-absolute"
                            >mdi-close</v-icon
                          >
                        </v-btn>
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                  <v-sheet
                    v-else
                    rounded="lg"
                    color="transparent"
                    class="placeholder-img cursor-pointer"
                    :height="SLIDER_HEIGHT"
                    :width="CARD_WIDTH"
                  >
                    <div
                      class="fill-height position-relative d-flex flex-column align-end justify-end"
                    >
                      <v-btn
                        block
                        prepend-icon="mdi-image-plus"
                        variant="tonal"
                        color="secondary"
                        @click="showUploader = true"
                      >
                        {{ $t("actions.upload") }}
                      </v-btn>
                    </div>
                  </v-sheet>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-card-text>
    </v-card>
    <GalleryViewer
      v-model:show-gallery="showGallery"
      v-model:active-img="activeImg"
      :gallery-content="film?.gallery || []"
      :name="film?.name"
      :no-content-label="$t('pages.films.no_gallery')"
      @close="showGallery = false"
    />
  </div>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
import BaseImg from "../Containment/Img/BaseImg.vue";
import GalleryViewer from "../Misc/GalleryViewer.vue";
defineEmits(["update:selected", "delete:selected", "uploader:open"]);
const props = defineProps<{
  film: Film | null;
  editMode: boolean;
  selected: number[];
}>();
const showUploader = ref(false);
const SLIDER_HEIGHT = 220;
const CARD_WIDTH = 180;

const computedGalleryEmptyCondition = computed(() => {
  return sliderGalleryArr.value.filter((item) => item !== "").length;
});

const fileInputRef = ref();
const GALLERY_SIZE = 8;
const showGallery = ref(false);
const activeImg = ref(0);

const galleryImgOptions = {
  height: 400,
  cover: true,
  uploader: true,
  placeholderOptions: {
    displayTitle: true,
  },
} as ImgOptions;

const openGalleryOnClick = (index: number) => {
  if (sliderGalleryArr.value[index] == "") {
    return;
  } else {
    showGallery.value = true;
    activeImg.value = index;
  }
};
const sliderGalleryArr = computed(() => {
  const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

  return initialArr.map((item) => {
    return props.film?.gallery[item] || "";
  });
});
</script>

<style scoped lang="scss">
.bg-selected {
  background-color: rgba(255, 0, 0, 0.2) !important;
}
</style>
