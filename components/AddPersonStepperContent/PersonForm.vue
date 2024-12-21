<template>
	<BaseForm
		@validate="validate"
		:loading="loading">
		<template #form>
			<v-form ref="formRef">
				<v-text-field
					v-model="personForm.firstname"
					name="firstname"
					:rules="nameRules"
					:label="$t('forms.person.firstname')"
					prepend-icon="mdi-account"></v-text-field>
				<v-text-field
					v-model="personForm.lastname"
					name="lastname"
					:rules="nameRules"
					:label="$t('forms.person.lastname')"
					prepend-icon="mdi-account"></v-text-field>
				<v-select
					v-model="personForm.genderId"
					name="genderId"
					item-value="value"
					item-title="name"
					:items="genders"
					:rules="selectRules"
					:hint="$t('forms.person.gender_hint')"
					:label="$t('forms.person.gender')"
					:prepend-icon="
						personForm.genderId === 1 ? 'mdi-gender-male' : 'mdi-gender-female'
					"></v-select>
					<v-select
						v-model="personForm.specialtyIds"
						name="specialtyIds"
						multiple
						:items="specialties"
						:rules="multipleSelectRules"
						:label="$t('forms.person.specialties')"
						:hint="$t('forms.person.specialty_hint')"
						item-value="value"
						item-title="name"
						prepend-icon="mdi-account-group"
					>
						
					</v-select>
				<v-text-field
					v-model="personForm.birthday"
					name="birthday"
					type="date"
					:rules="birthdayRules"
					:label="$t('forms.person.birthday')"
					prepend-icon="mdi-calendar"></v-text-field>
			</v-form>
		</template>
	</BaseForm>
</template>

<script lang="ts" setup>
	import BaseForm from "../Layout/Page/BaseForm.vue";
	const { t } = useI18n();
	const formRef = ref<any>(null);
	const emit = defineEmits(["submit", "error:validation"]);
	const props = defineProps<{
		personForm: Partial<Person>;
		genders: Gender[];
		loading: boolean;
		specialties: Specialty[];
	}>();

	const validate = async () => {
		const { valid } = await formRef.value.validate();
		valid ? emit("submit") : emit("error:validation");
	};

	const MAX_NAME_LENGHT = 50;
	const MIN_NAME_LENGHT = 2;
	const nameRules = [
		(v: string) => !!v || t("forms.rules.required"),
		(v: string) =>
			v.length <= MAX_NAME_LENGHT ||
			t("forms.rules.max_chars") + " " + MAX_NAME_LENGHT,
		(v: string) =>
			v.length >= MIN_NAME_LENGHT ||
			t("forms.rules.min_chars") + " " + MIN_NAME_LENGHT,
	];
	const selectRules = [(v: string) => !!v || t("forms.rules.required")];

	const date = useDate();
	const MIN_BIRTHDAY = new Date(1900, 0, 1);
	const MINAGE = 7;
	const currentYear = new Date().getFullYear();
	const MAX_BIRTHDAY = new Date(currentYear - MINAGE, 0, 1);

	const birthdayRules = [
		(v: string) => !!v || t("forms.rules.required"),
		(v: string) =>
			new Date(v) >= MIN_BIRTHDAY ||
			t("forms.rules.min_birthday", MINAGE) +
				" - " +
				date.getYear(MIN_BIRTHDAY),
		(v: string) =>
			new Date(v) <= MAX_BIRTHDAY ||
			t("forms.rules.max_birthday") + " - " + date.getYear(MAX_BIRTHDAY),
	];

	const multipleSelectRules = [
		(v: string) => v.length > 0 || t("forms.rules.required"),
	];
</script>
