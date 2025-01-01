<template>
  <v-container>
    <v-row>
      <v-col>
        <h5 class="text-h5 text-primary font-weight-bold">
          {{ $t("forms.film.gallery_actual") }}
        </h5>
        <v-list v-model="selected"  select-strategy="leaf">
          <v-list-item
            v-for="(img, index) in gallery"
            :key="img"
            variant="elevated"
            class="my-2"
            rounded="lg"
            nav
            :value="img"
            lines="two"
            :title="$t('general.img') + ' #' + (index + 1)"
          >
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
              </v-list-item-action>
              <v-avatar rounded="0" size="100">
                <BaseImg
                  :img-src="img"
                  :img-options="previewImgOptions"
                ></BaseImg>
              </v-avatar>
            </template>
            <template #append="{ isSelected }">
              <v-btn
                v-if="isSelected"
                color="error"
                variant="tonal"
                slim
                rounded="0"
                icon
                @click="deleteGalleryItem(index)"
              >
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="bottom"
                  >{{ $t("actions.remove") }}
                </v-tooltip>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-upload
          :title="$t('general.drag_and_drop')"
          :subtitle="$t('forms.film.gallery_restrictions')"
          :browse-text="$t('general.browse_files')"
          :divider-text="$t('general.or')"
          scrim="primary"
          clearable
          multiple
          show-size
          accept="image/*"
          length="5"
          :disabled="galleryFiles.length === 5"
          v-model="galleryFiles"
        >
          <template #item="{ props: itemProps, file }">
            <v-file-upload-item
              v-bind="itemProps"
              lines="two"
              nav
              :active="galleryPreviews.indexOf(file) !== -1"
              active-color="secondary"
              :title="file.name"
              :subtitle="$t('general.preview')"
              :value="file"
            >
              <template #prepend>
                <v-avatar size="100" rounded></v-avatar>
              </template>
              <template #append="{ isSelected }">
                <v-btn color="primary" slim icon @click="uploadGallery">
                  <v-icon icon="mdi-upload"></v-icon>
                  <v-tooltip activator="parent" location="bottom">{{
                    $t("actions.upload")
                  }}</v-tooltip>
                </v-btn>
              </template>
              <template #clear="{ props: clearProps }">
                <v-btn color="primary" v-bind="clearProps"></v-btn>
              </template>
            </v-file-upload-item>
          </template>
        </v-file-upload>
      </v-col>
    </v-row>
    <ConfirmDialog
      v-model="showDialog"
      :text="$t('forms.film.gallery_item_delete_confirm')"
      @confirm="$emit('gallery-item:delete')"
      type="warning"
      @cancel="showDialog = false"
    ></ConfirmDialog>
  </v-container>
</template>

<script lang="ts" setup>
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import BaseImg from "../Containment/Img/BaseImg.vue";
const emit = defineEmits(["submit", "gallery-item:delete", "error:validation"]);
interface GalleryItem {
  img: string;
  isPreview: boolean | undefined;
  uploaded: boolean;
}
const galleryItemFile = ref<File | null>();
const props = defineProps<{
  disabled?: boolean;
  loading?: boolean;
  gallery?: string[];
}>();
const galleryFiles = ref<File[]>([]);
const galleryPreviews = ref<GalleryItem[] | any>([]);
const galleryFormRef = ref<any>(null);
const validationError = ref(false);
const previewsPlaceholderArr = Array(6).fill(null);
const galleryFilePickerRef = ref<any>(null);
const showDialog = ref(false);
const { t } = useI18n();
const selected = ref<number | null>(null);
const galleryRules = [
  (value: any) => {
    return (
      Boolean(!value) || value.length <= 5 || t("forms.film.gallery_max_count")
    );
  },
] as any;

const clearGalleryImages = () => {
  galleryFiles.value = [];
  galleryPreviews.value = [];
};

const setGalleryImage = (index: number) => {
  const file = galleryFiles.value[index];
  if (file) {
    galleryPreviews.value[index] = {
      img: URL.createObjectURL(file),
      isPreview: true,
    };
  }
};

const uploadGallery = async () => {
  emit("submit", galleryFiles.value);
};

const deleteGalleryItem = (index: number) => {
  emit("gallery-item:delete", index);
};

const computedPreviewsArray = computed(() => {
  return previewsPlaceholderArr.map((_, index) => {
    let image = galleryPreviews.value[index]?.img || "";
    let isPreview = galleryPreviews.value[index]?.isPreview;
    let uploaded = galleryPreviews.value[index]?.uploaded;
    return {
      img: image,
      isPreview: image ? isPreview : true,
      uploaded: uploaded,
    };
  });
});

const setValidationError = () => {
  validationError.value = true;
};
const clearValidationError = () => {
  validationError.value = false;
};

const calculateTotalFilesSize = (arr: File[]): number => {
  const totalSize = arr.reduce((acc, file) => {
    return acc + file.size;
  }, 0);
  return totalSize;
};

const validatePreviews = (arr: File[]): boolean => {
  if (arr && arr.length) {
    const totalSize = calculateTotalFilesSize(arr);
    if (totalSize > 10000000) {
      setValidationError();
      return false;
    }
  }
  if (arr.length > 5) {
    setValidationError();
    return false;
  }
  clearValidationError();
  return true;
};

const computedDialogType = computed(() => {
  return galleryFiles.value.length > 0 ? "info" : "warning";
});

const computedDialogText = computed(() => {
  return galleryFiles.value.length === 0
    ? t("forms.film.gallery_empty_warning")
    : "";
});

const removeGalleryItem = (index: number) => {
  emit("gallery-item:delete", index);
};

const openPickerOnClick = (index: number) => {
  if (!galleryPreviews.value[index]?.uploaded) {
    galleryFilePickerRef.value[index].click();
  }
};

const clearGalleryItem = (index: number) => {
  galleryPreviews.value[index] = {
    img: "",
    isPreview: false,
    uploaded: false,
  };
};

const uploadGalleryItem = (index: number) => {
  const file = galleryFiles.value[index];
  if (file) {
    galleryPreviews.value[index] = {
      img: URL.createObjectURL(file),
      isPreview: true,
      uploaded: true,
    };
  }
};

watch(
  () => galleryFiles.value,
  () => {
    validatePreviews(galleryFiles.value);
  }
);

const previewImgOptions = {
  shaded: false,
  height: 250,
  cover: true,
  placeholderOptions: {
    displayTitle: false,
  },
};

onMounted(() => {
  galleryPreviews.value = props.gallery?.map((img) => {
    return {
      img,
      isPreview: undefined,
      uploaded: true,
    } as GalleryItem;
  });
});
</script>

<style></style>
