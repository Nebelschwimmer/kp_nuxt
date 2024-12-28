<template>
	<v-card
		class=""
		variant="text">
		<template #title>
			<span class="text-h4 font-weight-bold"> {{ title }}</span>
		</template>
		<v-divider></v-divider>
		<v-container>
			<template v-if="$vuetify.display.mdAndUp">
				<v-row>
					<v-col>
						<v-container>
							<v-row>
								<v-col>
									<BaseImg
										:img-src="imgSrc"
										:img-options="imgOptions" />
								</v-col>
							</v-row>
							<v-row
								><v-col> <slot name="gallery"></slot> </v-col
							></v-row>
						</v-container>
					</v-col>
					<v-col>
						<v-container>
							<v-row class="text-h5 text-primary font-weight-bold">
								<v-col>{{ $t("pages.general_info") }}</v-col>
							</v-row>
							<v-row
								v-for="detail in details"
								:key="detail.name"
								class="text-body-1">
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
									<v-col class="text-body-1">
										{{ description }}
									</v-col>
								</v-row>
							</template>
						</v-container>
					</v-col>
					<v-col cols="3">
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
				<v-row class="text-h6 text-primary font-bold">
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
						<v-col class="font-bold text-h6 text-primary"
							>{{ $t("pages.films.description") }}:</v-col
						>
					</v-row>
					<v-row class="text-body-2">
						<v-col>
							{{ description }}
						</v-col>
					</v-row>
				</template>
			</template>
		</v-container>
	</v-card>
</template>

<script lang="ts" setup>
	import BaseImg from "../Img/BaseImg.vue";
	const props = defineProps<{
		title?: string;
		imgSrc: string;
		noImgLabel?: string;
		details: CardDetails[];
		description: string;
	}>();
	const imgOptions = {
		shaded: false,
		height: 500,
		cover: true,
		clickable: true,
		placeholderOptions: {
			displayTitle: true,
			title: props.noImgLabel,
		},
	} as ImgOptions;
</script>

<style></style>
