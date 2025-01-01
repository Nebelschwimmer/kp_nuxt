<template>
  <BasePage
    :error="networkError"
    :loading="loading"
    :toolbar="false"
    @alert:close="networkError = null"
  >
    <template #content>
      <section>
        <h4
          class="text-h6 text-md-h5 text-lg-h4 font-weight-bold mb-4"
          id="newest"
        >
          #{{ $t("pages.home.newest") }}
        </h4>
        <v-divider></v-divider>
        <v-card variant="text">
          <template #text>
            <v-carousel
              v-model="activeFilm"
              :height="CAROUSEL_HEIGHT"
              cycle
              width="100%"
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(film, index) in films"
                v-if="!loading"
                :key="index"
                :value="index"
              >
                <v-card
                  variant="text"
                  height="100%"
                  @click="navigateTo('/films/' + film.id)"
                >
                  <template #text>
                    <BaseImg
                      :img-src="film.gallery[0] || ''"
                      :img-options="cardImgOptions"
                    >
                    </BaseImg>
                  </template>
                  <template #image>
                    <BaseImg
                      :img-src="film.preview || ''"
                      :img-options="bgImgOptions"
                    ></BaseImg>
                  </template>
                  <template #title>
                    <div
                      class="font-bold text-white text-h4 text-center p-0 text-truncate"
                    >
                      {{ film.name || "" }}
                    </div>
                  </template>
                </v-card>
              </v-carousel-item>
              <v-skeleton-loader v-else :height="CAROUSEL_HEIGHT" type="image">
              </v-skeleton-loader>
            </v-carousel>
          </template>
        </v-card>
    
          <v-list>
            <v-list-item
              v-for="(film, index) in films"
              v-if="!loading"
              :key="film.id || 0"
              :active="index === activeFilm"
              :title="film.name || ''"
              :subtitle="film.description || ''"
              :value="film.id || 0"
              lines="three"
              :color="index === activeFilm ? 'secondary' : 'transparent'"
              @click="navigateTo('/films/' + film.id)"
            >
              <template #prepend>
                <v-avatar rounded="0">
                  <BaseImg
                    :img-src="film.preview || ''"
                    :img-options="avatarImgOptions"
                  >
                  </BaseImg>
                </v-avatar>
              </template>
            </v-list-item>
            <v-skeleton-loader
              v-else
              v-for="k in 5"
              :key="k"
              height="100"
              type="list-item-avatar-three-line"
            >
            </v-skeleton-loader>
          </v-list>
      </section>
    </template>
  </BasePage>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/store/filmStore";
import BasePage from "~/components/Layout/Page/BasePage.vue";
import BaseImg from "~/components/Containment/Img/BaseImg.vue";
const { latestFilms, films, loading, networkError } = storeToRefs(useFilmStore());
const { fetchFilteredFilms } = useFilmStore();
const activeFilm = ref(0);

onMounted(async () => {
  await fetchFilteredFilms(5, 0, "", "ru");
});
const { t } = useI18n();
const CAROUSEL_HEIGHT = 400;
const cardImgOptions = {
  shaded: false,
  cover: false,
  height: CAROUSEL_HEIGHT - 100,
  placeholderOptions: {
    displayTitle: true,
    title: t("pages.films.no_preview"),
  },
} as ImgOptions;

const avatarImgOptions = {
  shaded: false,
  height: 50,
  cover: true,
  placeholderOptions: {
    displayTitle: false,
  },
};

const bgImgOptions = {
  shaded: true,
  height: "100%",
  cover: true,
  class: "img-blur",
  placeholderOptions: {
    displayTitle: false,
  },
};
</script>

<style lang="scss">
.img-blur {
  filter: blur(12px);
  opacity: 0.4;
}
</style>
