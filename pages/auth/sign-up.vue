<template>
	<div>
		<v-card variant="tonal">
			<v-toolbar class="stained-glass">
				<template #prepend>
					<BackBtn />
				</template>
				<v-toolbar-title> {{ $t("auth.register") }}</v-toolbar-title>
			</v-toolbar>

			<v-container>
				<v-row justify="center">
					<v-col
						cols="12"
						lg="6">
						<v-stepper v-model="step">
							<template v-slot:default="{ prev, next }">
								<v-stepper-header>
									<v-stepper-item
										value="1"
										:title="$t('stepper.general')"
										:complete="step > 1"
										:color="step > 1 ? 'success' : 'primary'"></v-stepper-item>
									<v-divider></v-divider>
									<v-stepper-item
										value="2"
										:title="$t('stepper.avatar_upload')"></v-stepper-item>
								</v-stepper-header>
								<v-stepper-window>
									<v-stepper-window-item value="1">
										<v-card rounded="lg">
											<v-form ref="registerFormRef">
												<div class="d-flex flex-column ga-1">
													<v-text-field
														v-model="userForm.username"
														density="compact"
														:label="$t('auth.login')"
														:placeholder="$t('auth.login_placeholder')"
														prepend-inner-icon="mdi-account-key"
														:rules="requiredRules">
													</v-text-field>
													<v-text-field
														v-model="userForm.password"
														:append-inner-icon="
															visible ? 'mdi-eye-off' : 'mdi-eye'
														"
														:type="visible ? 'text' : 'password'"
														:label="$t('auth.password')"
														density="compact"
														:placeholder="$t('auth.password_placeholder')"
														prepend-inner-icon="mdi-lock-outline"
														:rules="requiredRules"
														@click:append-inner="visible = !visible">
													</v-text-field>
													<v-text-field
														v-model="userForm.displayName"
														density="compact"
														:label="$t('auth.display_name')"
														:placeholder="$t('auth.login_placeholder')"
														prepend-inner-icon="mdi-account-eye">
													</v-text-field>
													<v-text-field
														v-model="userForm.email"
														density="compact"
														:label="$t('auth.email')"
														:placeholder="$t('auth.email_placeholder')"
														prepend-inner-icon="mdi-email-outline">
													</v-text-field>
													<v-text-field
														v-model.number="userForm.age"
														density="compact"
														:label="$t('forms.person.age')"
														prepend-inner-icon="mdi-calendar">
													</v-text-field>
													<v-textarea
														v-model="userForm.about"
														density="compact"
														:label="$t('auth.about')"
														prepend-inner-icon="mdi-pencil">
													</v-textarea>
												</div>
											</v-form>
											<v-btn
												color="primary"
												variant="tonal"
												:loading="loading"
												block
												@click="validate">
												{{ $t("auth.sign_up") }}
											</v-btn>
											<v-card-text>
												<v-btn
													prepend-icon="mdi-account-off"
													color="secondary"
													variant="plain"
													block
													to="/">
													{{ $t("auth.continue_as_guest") }}
												</v-btn>
											</v-card-text>
										</v-card>
									</v-stepper-window-item>
									<v-stepper-window-item value="2">
										<GalleryUploader
											:upload-count="1"
											@files:upload="handleUploadAvatar" />
									</v-stepper-window-item>
								</v-stepper-window>
								<v-stepper-actions
									:disabled="!isFormValid"
									@click:next="next"
									@click:prev="prev"></v-stepper-actions>
							</template>
						</v-stepper>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-snackbar
			color="error"
			v-model="showErrorMessage"
			:text="authError?.message || ''">
		</v-snackbar>
	</div>
</template>

<script lang="ts" setup>
	import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
	import { useUserStore } from "~/store/userStore";
	const isFormValid = ref(false);
	import { storeToRefs } from "pinia";
	const step = ref(0);
	const { userForm, loading, authError, showErrorMessage } =
		storeToRefs(useUserStore());
	const registerFormRef = ref();
	const { register, uploadAvatar, login } = useUserStore();
	const visible = ref(false);
	const { t } = useI18n();

	const requiredRules = [
		(value: string) => {
			if (value) return true;
			return t("forms.rules.required");
		},
	];

	const handleUploadAvatar = async (files: File[]) => {
		const file = files[0];
		const id = userForm.value.id;
		if (file) {
			await uploadAvatar(file, id || 0);
			navigateTo(`/sign-in`);
		}
	};

	const validate = async () => {
		const { valid } = await registerFormRef.value.validate();
		if (valid) {
			isFormValid.value = true;
			await register();
			step.value++;
		}
	};
	definePageMeta({});
</script>

<style></style>
