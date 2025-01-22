<template>
	<v-sheet class="pa-1" rounded="lg">
		<v-btn
			:active="$route.name === 'home'"
			:variant="$route.name === 'home' ? 'tonal' : 'text'"
			to="/"
			key="home_nav"
			prepend-icon="mdi-home"
			append-icon="mdi-chevron-down"
			>
			{{ $t("nav.home") }}
		</v-btn>
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					:active="$route.name === 'films' || $route.name === 'filmDetails'"
					:variant="
						$route.name === 'films' ||
						$route.name === 'filmDetails' ||
						$route.name === 'filmsNew'
							? 'tonal'
							: 'text'
					"
					key="films_nav"
					prepend-icon="mdi-filmstrip"
					append-icon="mdi-chevron-down">
					{{ $t("nav.films") }}
				</v-btn>
			</template>
			<v-list
				nav
				density="compact">
				<v-list-item
					:active="$route.name === 'films'"
					:variant="$route.name === 'films' ? 'tonal' : 'text'"
					prepend-icon="mdi-list-box"
					:title="$t('nav.films_list')"
					to="/films"></v-list-item>
				<v-list-item
					:active="$route.name === 'newFilm'"
					:variant="$route.name === 'newFilm' ? 'tonal' : 'text'"
					prepend-icon="mdi-plus"
					:title="$t('nav.films_add')"
					to="/films/new"></v-list-item>
			</v-list>
		</v-menu>
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					:active="
						$route.name === 'persons' ||
						$route.name === 'personDetails' ||
						$route.name === 'personsNew'
					"
					:variant="
						$route.name === 'persons' || $route.name === 'personDetails'
							? 'tonal'
							: 'text'
					"
					key="persons_nav"
					prepend-icon="mdi-account"
					append-icon="mdi-chevron-down"
					>
					{{ $t("nav.persons") }}
				</v-btn>
			</template>
			<v-list nav density="compact">
				<v-list-item
					:active="$route.name === 'persons'"
					:base-color="$route.name === 'persons' ? 'primary' : ''"
					prepend-icon="mdi-list-box"
					:title="$t('nav.persons_list')"
					to="/persons"></v-list-item>
					<v-list-item
					:active="$route.name === 'newPerson'"
					:base-color="$route.name === 'newPerson' ? 'primary' : ''"
					prepend-icon="mdi-plus"
					:title="$t('nav.persons_add')"
					to="/persons/new"></v-list-item>
			</v-list>
		</v-menu>
	</v-sheet>
</template>

<script lang="ts" setup></script>

<style></style>
