<template>
  <v-card rounded="lg" height="100%" :image="bgImg">
    <template #image>
      <v-img
        class="img-blur"
        gradient="45deg, rgba(105, 153, 201, 0.4) 0%, rgb(237, 123, 73, 0.06) 50%, rgb(237, 123, 73, 0.4) 100%"
      ></v-img>
    </template>
    <v-toolbar class="card-title">
      <v-toolbar-title
        class="text-h4 text-md-h6 text-lg-h6 text-xl-h5 text-sm-h6 font-weight-bold"
      >
        {{ title }}
      </v-toolbar-title>
      <slot name="rating"></slot>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-if="toolbarActions"
            slim
            density="comfortable"
            v-bind="props"
          >
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
            v-for="action in toolbarActions"
            :key="action.type"
            :base-color="action.type === 'delete' ? 'error' : ''"
            :prepend-icon="action.icon"
            :title="action.title"
            :to="action.to"
            :value="action.type"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col>
          <slot name="gallery"></slot>
        </v-col>
        <v-col>
          <v-list v-model:opened="opened" class="card-title" rounded="lg">
            <v-list-group value="general_info">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="text-primary font-weight-bold">
                    {{ $t("pages.general_info") }}
                  </v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                v-for="detail in details"
                :key="detail.name"
                :to="detail.type === 'link' ? detail.to : ''"
              >
                <v-list-item-title>
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
                <v-divider></v-divider>
              </v-list-item>
            </v-list-group>
            <template v-if="description">
              <v-list-group value="description">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-list-item-title class="font-weight-bold text-primary"
                      >{{ $t("pages.films.description") }}:</v-list-item-title
                    >
                  </v-list-item>
                </template>
                <v-list-item
                  class="text-body-2"
                  :title="description"
                  :lines="false"
                >
                </v-list-item>
              </v-list-group>
            </template>
            <v-list-group value="starring" :lines="false">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="font-weight-bold text-primary"
                    >{{ $t("pages.films.starring") }}:</v-list-item-title
                  >
                </v-list-item>
              </template>
              <v-list-item
                v-if="starring?.length"
                v-for="actor in starring"
                :key="actor.id"
                density="compact"
                :prepend-avatar="actor.photo"
              >
                <v-list-item-title>
                  <NuxtLink :to="`/persons/${actor.id}`" class="text-accent">{{
                    actor.name
                  }}</NuxtLink>
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-else>
                <v-list-item-title>
                  <span class="text-disabled">{{ $t("general.no_data") }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
const opened = ref(["general_info", "description", "starring"]);
defineProps<{
  title?: string;
  details: CardDetails[];
  description?: string;
  starring?: ActorObj[];
  bgImg?: string;
  toolbarActions?: ToolbarAction[];
}>();
</script>

<style></style>
