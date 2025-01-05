<template>
  <section>
    <v-card variant="text">
      <v-card-title>
        <span class="text-h5">{{ $t("pages.home.newest") }}</span>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-text>
        <v-slide-group>
          <v-slide-group-item
            v-for="(film, index) in latestFilms"
            :key="index"
            :value="index"
          >
            <v-card
              variant="text"
              :height="$vuetify.display.smAndDown ? 240 : 340"
              :width="$vuetify.display.smAndDown ? 160 : 300"
              class="ma-2"
              @click="navigateTo('/films/' + film.id)"
            >
              <template #image>
                <BaseImg
                :img-src="film.gallery[0] || ''"
                :img-options="bgImgOptions"
                ></BaseImg>
              </template>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/store/filmStore";
import BaseImg from "~/components/Containment/Img/BaseImg.vue";

const { latestFilms } = storeToRefs(useFilmStore());
const { fetchLatestFilms } = useFilmStore();


const bgImgOptions = {
  shaded: false,
  height: "100%",
  cover: true,
  placeholderOptions: {
    displayTitle: true,
  },
};
onMounted(async () => {
  await fetchLatestFilms();
});
</script>
