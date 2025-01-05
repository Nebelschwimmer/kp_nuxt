<template>
  <div>
    <v-card :title="$t('pages.films.gallery')" >
      <v-divider></v-divider>
      <template #append>
        <v-btn
          size="small"
          icon
          :variant="editGalleryMode ? 'outlined' : 'tonal'"
          :color="editGalleryMode ? 'error' : 'primary'"
          @click="editGalleryMode = !editGalleryMode"
        >
        <v-icon>{{ editGalleryMode ? 'mdi-close' : 'mdi-pencil' }}</v-icon>
        </v-btn>
      </template>
      <v-card-text>
        <v-sheet rounded="lg" color="transparent" max-width="100%">
          <v-slide-group v-if="!editGalleryMode">
            <v-slide-group-item
              v-for="(img, index) in sliderGalleryArr"
              :key="index"
              :value="index"
            >
              <v-card
                variant="plain"
                :height="SLIDER_HEIGHT"
                :width="SLIDER_HEIGHT - 50"
                class="ma-2"
                @click="openGalleryOnClick(index)"
              >
                <template #image>
                  <BaseImg
                    v-if="img"
                    :img-src="img"
                    :img-options="galleryImgOptions"
                  >
                  </BaseImg>
                  <v-sheet
                    v-else
                    rounded="lg"
                    color="transparent"
                    class="placeholder-img cursor-pointer"
                    width="100%"
                    height="100%"
                    @click="editGalleryMode = true"
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
          <v-item-group v-else>
            <v-container>
              <v-row align-content="center">
                <v-col v-for="(img, index) in sliderGalleryArr" :key="index">
                  <v-item v-slot="{ isSelected, toggle }">
                    <v-card
                      v-if="img"
                      variant="plain"
                      rounded="lg"
                      :color="isSelected ? 'error' : ''"
                      class="d-flex align-center"
                      :height="SLIDER_HEIGHT"
                      :width="SLIDER_HEIGHT - 50"
                      :image="img"
                      @click="toggle"
                    >
                      <v-scroll-y-transition> </v-scroll-y-transition>
                    </v-card>
                    <v-sheet
                      v-else
                      rounded="lg"
                      color="transparent"
                      class="placeholder-img cursor-pointer"
                      :height="SLIDER_HEIGHT"
                      :width="SLIDER_HEIGHT - 50"
                    >
                      <div
                        class="fill-height position-relative d-flex flex-column align-end justify-end"
                      >
                        <v-btn
                          block
                          variant="tonal"
                          color="secondary"
                          @click="showUploader = true"
                        >
                          <v-file-input
                            ref="fileInputRef"
                            hide-input
                            prepend-icon="mdi-image-plus"
                            :label="$t('general.available_for_upload')"
                          >
                          </v-file-input>
                        </v-btn>
                      </div>
                    </v-sheet>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-sheet>
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
import ImgPlaceholder from '../Containment/Img/ImgPlaceholder.vue';
import BaseImg from '../Containment/Img/BaseImg.vue';
import GalleryViewer from '../Misc/GalleryViewer.vue';
const props = defineProps<{
  film: Film | null;
}>();
const showUploader = ref(false);
const SLIDER_HEIGHT = 200;
const editGalleryMode = ref(false);
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

<style></style>
