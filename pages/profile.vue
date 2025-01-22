<template>
	<div>
		<DetailCard
			:title="$t('pages.profile.title')"
			:loading="loading">
			<template #text>
				<v-container>
					<v-row>
						<v-col cols="auto">
							<v-hover :disabled="!currentUser?.avatar">
								<template #default="{ isHovering, props }">
									<v-card v-bind="props">
										<v-avatar size="250">
											<BaseImg
												:img-src="currentUser?.avatar || ''"
												:img-options="avatarImgOptions" />
										</v-avatar>
										<v-fab
											:active="isHovering ? true : false"
											absolute
											:icon="currentUser?.avatar ? 'mdi-pencil' : 'mdi-plus'"
											color="primary"
											@click="handleAvatar"></v-fab>
									</v-card>
								</template>
							</v-hover>
						</v-col>
						<v-col>
							<ListCard
								:header-title="$t('pages.profile.personal_info')"
								:edit-mode="editMode"
								:loading="loading"
								header-icon="mdi-account"
								editable>
								<template #content>
									<v-list-item
										v-for="(info, index) in computedInfo"
										:key="index"
										:title="info.name"
										:prepend-icon="info.icon"
										:subtitle="
											info.value || $t('general.no_data')
										"></v-list-item>
								</template>
							</ListCard>
						</v-col>
					</v-row>
				</v-container>
			</template>
		</DetailCard>
		<ConfirmDialog
			v-model="showWarning"
			:text="$t('pages.profile.avatar_replace_warning')"
			@cancel="showWarning = false"
			@confirm="replaceAvatar" />
		<BaseDialog
			v-model:opened="showAvatarUploadDialog"
			:title="
				currentUser?.avatar
					? $t('pages.profile.change_avatar')
					: $t('pages.profile.upload_avatar')
			"
			:loading="loading"
			@close="showAvatarUploadDialog = false">
			>
			<template #text>
				<GalleryUploader
					:upload-count="1"
					:upload-error="false"
					@files:upload="handleUploadAvatar" />
			</template>
		</BaseDialog>
		<ConfirmDialog
			v-model="showConfirmDialog"
			:text="$t('auth.logout_confirm')"
			@cancel="showConfirmDialog = false"
			@confirm="handleSignOut" />
	</div>
</template>

<script lang="ts" setup>
	import { useUserStore } from "~/store/userStore";
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
	import ListCard from "~/components/Containment/Cards/ListCard.vue";
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
	import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
	const { currentUser, loading } = storeToRefs(useUserStore());
	const showConfirmDialog = ref(false);
	const { signOut, uploadAvatar, fetchCurrentUser } = useUserStore();
	const editMode = ref(false);
	const handleSignOut = async () => {
		await signOut();
		showConfirmDialog.value = false;
	};
	const showWarning = ref(false);
	const showAvatarUploadDialog = ref(false);
	const avatarImgOptions = {
		cover: true,
		placeholderOptions: {
			displayTitle: true,
		},
	} as ImgOptions;

	const { t } = useI18n();

	const handleAvatar = () => {
		showAvatarUploadDialog.value = true;
	};

	const handleUploadAvatar = async (files: File[]) => {
		const file = files[0];
		const id = Number(currentUser.value?.id);
		if (file) {
			!currentUser.value?.avatar
				? await uploadAvatar(file, id || 0)
				: showWarningFunc(file);
		}
		showAvatarUploadDialog.value = false;
	};
	const avatarFile = ref<File>();
	const showWarningFunc = (file: File) => {
		showWarning.value = true;
		avatarFile.value = file;
	};

	const replaceAvatar = async () => {
		const id = Number(currentUser.value?.id);
		await uploadAvatar(avatarFile.value as File, id || 0);
		showWarning.value = false;
	};

	const computedInfo = computed(() => {
		return [
			{
				name: t("auth.display_name"),
				value: currentUser.value?.displayName || "",
				icon: "mdi-email",
			},
			{
				name: t("auth.email"),
				value: currentUser.value?.email || "",
				icon: "mdi-email",
			},
			{
				name: t("forms.person.age"),
				value: currentUser.value?.age || "",
				icon: "mdi-cake",
			},
		];
	});

	definePageMeta({
		title: "Profile",
	});
</script>

<style></style>
