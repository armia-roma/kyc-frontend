<script setup lang="ts">
defineProps({
	show: Boolean,
	filePath: String,
});
</script>
<template>
	<v-card class="mb-4">
		<v-card-title>Document</v-card-title>
		<v-card-text>
			<a :href="filePath" target="_blank">
				<v-img
					:src="filePath"
					cover
					height="300"
					class="bg-grey-lighten-2"
				></v-img>
			</a>
		</v-card-text>
	</v-card>
</template>
