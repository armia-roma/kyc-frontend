<script setup lang="ts">
defineProps({
	kycDetails: Object,
});
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleString();
};
</script>
<template>
	<v-list>
		<v-list-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-account"></v-icon>
			</template>
			<v-list-item-title>Full Name</v-list-item-title>
			<v-list-item-subtitle>{{
				kycDetails?.full_name
			}}</v-list-item-subtitle>
		</v-list-item>

		<v-list-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-email"></v-icon>
			</template>
			<v-list-item-title>Email</v-list-item-title>
			<v-list-item-subtitle>{{ kycDetails?.email }}</v-list-item-subtitle>
		</v-list-item>

		<v-list-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-phone"></v-icon>
			</template>
			<v-list-item-title>Phone Number</v-list-item-title>
			<v-list-item-subtitle>{{
				kycDetails?.phone_number
			}}</v-list-item-subtitle>
		</v-list-item>

		<v-list-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-map-marker"></v-icon>
			</template>
			<v-list-item-title>Address</v-list-item-title>
			<v-list-item-subtitle>{{
				kycDetails?.address
			}}</v-list-item-subtitle>
		</v-list-item>

		<v-list-item>
			<template v-slot:prepend>
				<v-icon icon="mdi-clock"></v-icon>
			</template>
			<v-list-item-title>Submitted On</v-list-item-title>
			<v-list-item-subtitle>{{
				formatDate(kycDetails?.createdAt)
			}}</v-list-item-subtitle>
		</v-list-item>
	</v-list>
</template>
