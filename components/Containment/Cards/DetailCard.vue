<template>
	<v-card
		variant="text"
		class="base-card">
		<v-card-title class="text-h4 text-accent font-bold">
			<div class="text-h4 text-accent font-bold"> {{ title || "" }}</div>
			<slot name="rating"></slot>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-subtitle>
			<span> {{ subtitle || "" }}</span>
		</v-card-subtitle>

		<v-container>
			<template v-if="$vuetify.display.mdAndUp">
				<v-row>
					<v-col>
						<v-container>
							<v-row>
								<v-col>
									<v-img
										:src="imgSrc || ''"
										cover>
										<template #placeholder>
											<v-sheet class="d-flex align-center justify-center">
												<span>{{ noImgLabel }}</span>
											</v-sheet>
										</template>
									</v-img>
								</v-col>
							</v-row>
							<v-row
								><v-col> <slot name="gallery"></slot> </v-col
							></v-row>
						</v-container>
					</v-col>
					<v-col>
						<v-container>
							<v-row class="text-h5 text-primary font-bold">
								<v-col>{{ $t("pages.general_info") }}</v-col>
							</v-row>
							<v-row
								v-for="detail in details"
								:key="detail.name"
								class="text-body-2">
								<v-col>
									<span class="font-bold"> {{ $t(detail.name) }}: </span>
									<NuxtLink
										v-if="detail.type == 'link'"
										:to="detail.to">
										<span
											v-if="detail.value"
											class="text-accent"
											>{{ detail.value }}</span
										>
										<span
											v-else
											class="text-disabled"
											>{{ $t("general.no_data") }}</span
										>
									</NuxtLink>
									<span v-else-if="detail.value">{{ detail.value }}</span>
									<span
										v-else
										class="text-disabled"
										>{{ $t("general.no_data") }}</span
									>
								</v-col>
								<v-divider></v-divider>
							</v-row>
							<template v-if="description">
								<v-row>
									<v-col class="font-bold text-h5 text-primary"
										>{{ $t("pages.films.description") }}:</v-col
									>
								</v-row>
								<v-row>
									<v-col>
										{{ description }}
									</v-col>
								</v-row>
							</template>
						</v-container>
					</v-col>
					<v-col
						class="border rounded-md"
						cols="auto">
						<v-container>
							<slot name="rating_starring"> </slot>
						</v-container>
					</v-col>
				</v-row>
			</template>
			<template v-else>
				<v-row>
					<v-col>
						<slot name="gallery"></slot>
					</v-col>
				</v-row>
				<v-row class="text-h5 text-primary font-bold">
					<v-col>{{ $t("pages.general_info") }}</v-col>
				</v-row>
				<v-row
					v-for="detail in details"
					:key="detail.name"
					class="text-body-2">
					<v-col>
						<span class="font-bold"> {{ $t(detail.name) }}: </span>
						<NuxtLink
							v-if="detail.type == 'link'"
							:to="detail.to">
							<span
								v-if="detail.value"
								class="text-accent"
								>{{ detail.value }}</span
							>
							<span
								v-else
								class="text-disabled"
								>{{ $t("general.no_data") }}</span
							>
						</NuxtLink>
						<span v-else-if="detail.value">{{ detail.value }}</span>
						<span
							v-else
							class="text-disabled"
							>{{ $t("general.no_data") }}</span
						>
					</v-col>
					<v-divider></v-divider>
				</v-row>
				<template v-if="description">
					<v-row>
						<v-col class="font-bold text-h5 text-primary"
							>{{ $t("pages.films.description") }}:</v-col
						>
					</v-row>
					<v-row>
						<v-col>
							{{ description }}
						</v-col>
					</v-row>
				</template>
			</template>
		</v-container>
		<v-card-actions>
			<slot name="actions"></slot>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
	defineProps<{
		title: string;
		subtitle: string | number | null;
		rating: number;
		imgSrc: string;
		noImgLabel?: string;
		details: CardDetails[];
		description: string;
	}>();
</script>

<style></style>
