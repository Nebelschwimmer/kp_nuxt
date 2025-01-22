<template>
  <div>
    <v-btn v-if="!currentUser" prepend-icon="mdi-login" variant="tonal" class="ma-2" to="/auth/sign-in">{{ $t("auth.sign_in") }}
    </v-btn>
    <v-sheet v-else class="d-flex align-center justify-center pa-1 ma-1 px-2" rounded="lg">
      <v-list-item  
      link
      rounded="lg" 
      :title="currentUser.displayName || currentUser.username" 
      :subtitle="currentUser.email"
      to="/profile">
        <template #prepend>
          <v-avatar>
            <BaseImg :img-src="currentUser.avatar || ''" :img-options="avatarImgOptions" />
          </v-avatar>
        </template>
      </v-list-item>
      <v-btn v-if="currentUser" icon rounded="0" @click="showConfirmDialog = true" >
            <v-icon>mdi-logout</v-icon>
            <v-tooltip activator="parent" location="bottom">{{ $t("auth.sign_out") }} </v-tooltip activator="parent"
              location="bottom">
      </v-btn>
    </v-sheet>
    <ConfirmDialog v-model="showConfirmDialog" @cancel="showConfirmDialog = false"  :text="$t('auth.logout_confirm')" @confirm="handleSignOut"/>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from "~/store/userStore";
  import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
  import BaseImg from "../Containment/Img/BaseImg.vue";
  const showConfirmDialog = ref(false);
  const { currentUser } = storeToRefs(useUserStore());
  const { signOut } = useUserStore();
  const handleSignOut = async () => {
    await signOut();
    showConfirmDialog.value = false;
  }
  const avatarImgOptions = {
    cover: true,
    placeholderOptions: {
      displayTitle: true,
    },
  } as ImgOptions;
  onMounted(async () => {
    const user = localStorage.getItem("user");
    if (user) {
      currentUser.value = JSON.parse(user);
    }
  });
</script>
