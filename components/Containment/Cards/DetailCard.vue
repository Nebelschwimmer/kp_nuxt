<template>
  <v-card rounded="lg" variant="elevated" elevation="10" class="mx-auto" height="100%">
    <template #title>
      <span class="text-h4 font-weight-bold"> {{ title }}</span>
    </template>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="6" xl="5" xxl="5">
          <slot name="gallery"></slot>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="4" xl="4" xxl="3">
          <v-list>
            <span class="text-subtitle-1 text-primary font-weight-bold">{{
              $t("pages.general_info")
            }}</span>
            <v-list-item
              v-for="detail in details"
              :key="detail.name"
              density="compact"
              variant="elevated"
              elevation="2"
              class="text-body-2 my-1"
              :to="detail.type === 'link' ? detail.to : ''"
            >
              <v-list-item-title class="text-subtitle-2">
                <span> {{ $t(detail.name) }}: </span>
                <span
                  v-if="detail.value"
                  :class="[
                    'font-weight-bold',
                    { 'text-accent': detail.type === 'link' },
                  ]"
                  >{{ detail.value }}</span
                >
                <span v-else class="text-disabled">{{
                  $t("general.no_data")
                }}</span>
              </v-list-item-title>
            </v-list-item>
            <template v-if="description">
              <v-list-item :lines="false">
                <v-list-item-title
                  class="font-weight-bold text-subtitle-1 text-primary"
                  >{{ $t("pages.films.description") }}:</v-list-item-title
                >
                <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3" xl="3" xxl="2">
          <v-container>
            <slot name="rating_starring"> </slot>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
  details: CardDetails[];
  description: string;
}>();
</script>

<style></style>
