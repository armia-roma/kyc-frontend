<script setup lang="ts">
defineProps({
	show: Boolean,
});
</script>

<template>
	<v-card-actions v-if="show">
		<v-btn @click="$emit('updateStatus', 'approve')" color="success">
			Approve
		</v-btn>
		<v-btn @click="$emit('updateStatus', 'reject')" color="error">
			Reject
		</v-btn>
	</v-card-actions>
</template>
