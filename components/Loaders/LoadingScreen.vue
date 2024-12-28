<template>
	<div
		class="d-flex flex-column p-5 gap-2 flex-calign-center justify-center overlay">
		<span class="text-center">{{ $t("state.loading") }}...</span>
		<span class="progress w-1/2 mx-auto"></span>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 100%;
		background-color: rgb(255, 255, 255) !important;

	}

	.progress {
		width: 48px;
		height: 48px;
		border: 5px solid #00000017;
		border-bottom-color: #ff4d00;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
