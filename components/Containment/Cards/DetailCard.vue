<template>
  <v-layout>
    <v-card variant="text" :image="bgImg" :subtitle="subtitle">
      <template #image>
        <v-img
          class="img-blur"
          gradient="135deg, rgba(105, 153, 201, 0.1) 0%,  rgb(237, 123, 73, 0.2) 100%"
        ></v-img>
      </template>
      <template #title>
        <span class="text-body-1 text-md-h5 text-lg-h4">{{ title }}</span>
      </template>
      <v-list variant="text" lines="one" density="compact" subheader>
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-container>
                <v-row>
                  <v-col>
                    <v-avatar
                      variant="tonal"
                      size="300"
                      class="ma-3 cursor-pointer"
                      @click="showGallery = true"
                    >
                      <BaseImg
                        :img-src="avatar || ''"
                        :img-options="avatarOptions"
                      />
                    </v-avatar>
                    <GalleryViewer
                      v-model:show-gallery="showGallery"
                      :gallery-content="galleryContent || []"
                      :name="title"
                      :no-content-label="$t('pages.films.no_gallery')"
                      @close="showGallery = false"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-slide-group>
                      <v-slide-group-item
                        v-for="img in galleryContent"
                        :key="img"
                      >
                        <v-avatar
                          variant="plain"
                          size="80"
                          rounded="lg"
                          class="ma-3 cursor-pointer"
                        >
                          <v-img :src="img" />
                        </v-avatar>
                      </v-slide-group-item>
                    </v-slide-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col>
              <v-container>
                <v-row>
                  <v-col>
                    <v-list-subheader
                      prepend-icon="mdi-information"
                      :title="
                        (groupNames && groupNames[0]) || $t('general.no_data')
                      "
                    ></v-list-subheader>
                    <v-list-item
                      v-for="(detail, index) in details"
                      :key="index"
                      :prepend-icon="detail.icon"
                      :title="$t(detail.name)"
                      :subtitle="detail.value || $t('general.no_data')"
                    >
                    </v-list-item>
                  </v-col>
                </v-row>
                <template v-if="listTwo">
                  <v-row>
                    <v-col>
                      <v-list-subheader
                        :title="
                          (groupNames && groupNames[1]) || $t('general.no_data')
                        "
                      ></v-list-subheader>
                      <v-list-item
                        v-for="(detail, index) in listTwo"
                        :key="index"
                        :prepend-icon="detail.icon"
                        :title="$t(detail.name)"
                        :to="detail.to"
                        :value="detail"
                        :subtitle="detail.value || $t('general.no_data')"
                      >
                      </v-list-item>
                    </v-col>
                  </v-row>
                </template>
              </v-container>
            </v-col>
            <template v-if="listThree">
              <v-col>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-list-subheader
                        :title="
                          (groupNames && groupNames[2]) || $t('general.no_data')
                        "
                      ></v-list-subheader>
                      <v-list-item
                        v-for="(detail, index) in listThree"
                        :key="index"
                        :prepend-icon="detail.icon"
                        :title="detail.name"
                        :to="detail.to"
                        :value="index"
                        :subtitle="detail.value || $t('general.no_data')"
                      >
                      </v-list-item>
                    </v-col>
                  </v-row>
                  <template v-if="rating !== null">
                    <ClientOnly>
                      <v-row>
                        <v-col>
                          <v-rating
                            :model-value="rating"
                            color="yellow-darken-3"
                          ></v-rating>
                        </v-col>
                      </v-row>
                    </ClientOnly>
                  </template>
                </v-container>
              </v-col>
            </template>
          </v-row>
          <template v-if="description">
            <v-row>
              <v-col>
                <v-list-subheader :title="$t('pages.films.description')">
                </v-list-subheader>
                <v-list-item>
                  <p>{{ description }}</p>
                </v-list-item>
              </v-col>
            </v-row>
          </template>
        </v-container>
        <v-speed-dial location="left center">
          <template v-slot:activator="{ props: activatorProps }">
            <v-fab
              :icon="!activeSpeedDials ? 'mdi-dots-vertical' : 'mdi-close'"
              offset
              v-bind="activatorProps"
              app
              location="right center"
              class="mr-10"
              color="primary"
              size="64"
              @click="activeSpeedDials = !activeSpeedDials"
            ></v-fab>
          </template>
          <v-btn
            key="1"
            icon="mdi-delete"
            color="error"
            @click="showGallery = true"
          ></v-btn>
          <v-btn key="2" icon="mdi-pencil" color="warning"></v-btn>
        </v-speed-dial>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script lang="ts" setup>
import BaseImg from "../Img/BaseImg.vue";
import GalleryViewer from "~/components/Misc/GalleryViewer.vue";
defineProps<{
  title?: string;
  subtitle?: string;
  details: CardDetails[];
  description?: string;
  bgImg?: string;
  listTwo?: CardDetails[];
  listThree?: CardDetails[];
  rating?: number;
  editLink?: string;
  groupNames?: string[];
  avatar?: string;
  galleryContent?: string[];
}>();

const showGallery = ref(false);
const activeSpeedDials = ref(false);
const avatarOptions = {
  shaded: false,
  height: "100%",
  cover: true,
  clickable: true,
  aspectRatio: "16/9",
  placeholderOptions: {
    displayTitle: false,
  },
};
</script>

<style scoped lang="scss">
.sticky-fab {
  position: absolute;
  top: 116px;
  right: 216px;
  z-index: 10;
}
</style>
