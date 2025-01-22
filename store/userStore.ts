export const useUserStore = defineStore("user", () => {
	const config = useRuntimeConfig();
	const currentUser = ref<CurrentUser | null>();
	const user = ref(null);
	const loading = ref(false);
	const authError = ref<Error | null>();
	const userForm = ref({} as UserForm);
	const showErrorMessage = ref(false);
	const fetchCurrentUser = async (id: Number) => {
		try {
			const { data } = await useFetch<CurrentUser>(
				`${config.public.apiBase}/user/${id}`
			);
			currentUser.value = data.value;
		} catch (error: any) {
			authError.value = error;
			showErrorMessage.value = true;
		}
	};
	const register = async () => {
		try {
			loading.value = true;
			const response = await $fetch<UserForm>(
				`${config.public.apiBase}/register`,
				{
					method: "POST",
					body: userForm.value,
				}
			);
			userForm.value = response;
		} catch (error: any) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};

	const login = async () => {
		try {
			loading.value = true;
			const response = await $fetch<CurrentUser>(
				`${config.public.apiBase}/login`,
				{
					method: "POST",
					body: userForm.value,
				}
			);
			currentUser.value = response;
			localStorage.setItem("user", JSON.stringify(response));
		} catch (error: any) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};
	const signOut = async () => {
		await $fetch<CurrentUser>(`${config.public.apiBase}/logout`, {
			method: "POST",
		});
		currentUser.value = null;
		localStorage.removeItem("user");
	};
	const uploadAvatar = async (avatar: File, id: Number) => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("file", avatar);
			const response = await $fetch<CurrentUser>(
				`${config.public.apiBase}/users/${id}/avatar`,
				{
					method: "POST",
					body: formData,
				}
			);
			currentUser.value = response;
		} catch (error: any) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};
	return {
		currentUser,
		userForm,
		user,
		loading,
		authError,
		showErrorMessage,
		fetchCurrentUser,
		register,
		login,
		signOut,
		uploadAvatar,
	};
});
