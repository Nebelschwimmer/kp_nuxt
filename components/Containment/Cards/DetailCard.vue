<template>
  <v-card
    rounded="lg"
    class="relative-position"
    variant="text"
    height="100%"
    :image="bgImg"
  >
    <template #image>
      <v-img
        class="img-blur"
        gradient="45deg, rgba(105, 153, 201, 0.4) 0%, rgb(237, 123, 73, 0.06) 50%, rgb(237, 123, 73, 0.4) 100%"
      ></v-img>
    </template>

    <v-toolbar extended class="card-header" height="130" extension-height="20">
      <template #prepend>
        <slot name="gallery"></slot>
      </template>
      <template #title>
        <span class="text-h6 text-md-h5 text-lg-h4">{{ title }}</span>
      </template>
      <template #extension>
        <v-fab
          v-if="editLink"
          class="ma-4"
            icon="mdi-pencil"
            location="bottom end"
            color="primary"
            absolute
            size="64"
            :to="editLink"
            offset
        ></v-fab>
      </template>
    </v-toolbar>

    <v-card-text>
      <v-list
        v-model:opened="opened"
        lines="one"
        variant="text"
        rounded="lg"
        class="base-card mt-6"
      >
        <v-list-group value="list_one">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-information"
              :title="(groupNames && groupNames[0]) || $t('general.no_data')"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(detail, index) in details"
            :key="index"
            :prepend-icon="detail.icon"
            :title="$t(detail.name)"
            :subtitle="detail.value || $t('general.no_data')"
          >
          </v-list-item>
        </v-list-group>
        <v-list-group v-if="listTwo" value="list_two">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              :title="(groupNames && groupNames[1]) || $t('general.no_data')"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(detail, index) in listTwo"
            :key="index"
            :prepend-icon="detail.icon"
            :title="$t(detail.name)"
            :to="detail.to"
            :value="detail"
            base-color="primary"
            :subtitle="detail.value || $t('general.no_data')"
          >
          </v-list-item>
        </v-list-group>
        <v-list-group v-if="listThree" value="list_three">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              :title="(groupNames && groupNames[2]) || $t('general.no_data')"
            ></v-list-item>
          </template>
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
        </v-list-group>
        <template v-if="description">
          <v-list-item
            prepend-icon="mdi-details"
            :title="description"
            :subtitle="$t('pages.films.description')"
          ></v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
  details: CardDetails[];
  description?: string;
  bgImg?: string;
  listTwo?: CardDetails[];
  listThree?: CardDetails[];
  toolbarActions?: ToolbarAction[];
  rating?: number;
  editLink?: string;
  groupNames?: string[];
}>();

const opened = ref(["list_one"]);
</script>

<style lang="scss">

.base-card {
  background-color: rgba($color: #222222, $alpha: 0.6) !important;
}

.card-header{
  background-color: rgba($color: #2b2b2b, $alpha: 0.7) !important;
}
</style>
