<template>
	<v-card
		class="mx-auto"
		max-width="1400">
		<template #image>
			<v-img
				class="img-blur"
				gradient="to left bottom, #000000, #131313, #1f1f1f, #2c2c2c, #393939"></v-img>
		</template>
		<v-card-text> 
      <slot name="default"></slot>
    </v-card-text>
	</v-card>
</template>

<script lang="ts" setup></script>
