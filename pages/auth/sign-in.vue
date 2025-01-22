<template>
	<div>
		<v-card
			class="mx-auto pa-5 pb-8 mt-12"
			elevation="8"
			rounded="lg"
			max-width="448"
			variant="tonal">
			<v-toolbar class="my-4">
				<template #prepend>
					<BackBtn />
				</template>
				<v-toolbar-title> {{ $t("auth.sign_in") }}</v-toolbar-title>
				<LanguageChangeBtn stacked />
			</v-toolbar>

			<v-form
				class="my-10"
				ref="loginFormRef">
				<div class="d-flex flex-column ga-2">
					<v-text-field
						v-model="userForm.username"
						density="compact"
						:label="$t('auth.login')"
						:placeholder="$t('auth.login_placeholder')"
						prepend-inner-icon="mdi-account-key"
						variant="outlined"
						:rules="requiredRules">
					</v-text-field>
					<v-text-field
						v-model="userForm.password"
						:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
						:type="visible ? 'text' : 'password'"
						:label="$t('auth.password')"
						density="compact"
						:placeholder="$t('auth.password_placeholder')"
						prepend-inner-icon="mdi-lock-outline"
						variant="outlined"
						:rules="requiredRules"
						@click:append-inner="visible = !visible">
					</v-text-field>
				</div>
			</v-form>

			<v-btn
				class="mb-8"
				color="primary"
				size="large"
				variant="tonal"
				block
				:loading="loading"
				@click="validate">
				{{ $t("auth.sign_in") }}
			</v-btn>

			<v-card-text class="text-center">
				<div class="d-flex flex-column ga-2">
					<v-btn
						to="/auth/sign-up"
						variant="outlined"
						prepend-icon="mdi-account-plus">
						{{ $t("auth.register") }}
					</v-btn>
					<v-btn
						prepend-icon="mdi-account-off"
						color="secondary"
						variant="plain"
						block
						to="/">
						{{ $t("auth.continue_as_guest") }}
					</v-btn>
				</div>
			</v-card-text>
		</v-card>
		<v-snackbar
			color="error"
			v-model="showErrorMessage"
			:text="authError?.message || ''"></v-snackbar>
	</div>
</template>

<script lang="ts" setup>
	import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
	import LanguageChangeBtn from "~/components/Containment/Btns/LanguageChangeBtn.vue";
	import { useUserStore } from "~/store/userStore";
	import { storeToRefs } from "pinia";
	const { userForm, loading, authError, showErrorMessage } =
		storeToRefs(useUserStore());
	const { t } = useI18n();
	const loginFormRef = ref();
	const { login } = useUserStore();
	const requiredRules = [
		(value: string) => {
			if (value) return true;
			return t("forms.rules.required");
		},
	];
	const validate = async () => {
		const { valid } = await loginFormRef.value.validate();
		if (valid) {
			await login();
			if (!showErrorMessage.value) {
				navigateTo("/");
			}
		}
	};
	definePageMeta({});

	const visible = ref(false);
</script>
