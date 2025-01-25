<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import {useRoute} from "vue-router";
import apiClient from "../../service/api-client";
import KycDetailsActions from "../components/KycDetailsActions.vue";
import KycDetailsDocument from "@/components/KycDetailsDocument.vue";
import KycDetails from "@/components/KycDetails.vue";
interface KycDetails {
	_id: string;
	full_name: string;
	email: string;
	phone_number: string;
	address: string;
	file_path: string;
	status: string;
	createdAt: string;
}

const route = useRoute();
const kycDetails = ref<KycDetails | null>(null);
const loading = ref(false);

const alertMessage = ref("");
const alertType = ref<"success" | "error">();
const alertValue = ref(false);

const userRole = ref<string | null>(null);
const isAdmin = computed(() => userRole.value === "admin");
userRole.value = localStorage.getItem("userRole");

const updateStatus = async (status: string) => {
	try {
		loading.value = true;
		const response = await apiClient.put(
			`/kyc/${status}/${route.params.id}`,
			{status}
		);
		fetchKycDetails();
	} catch (error: any) {
		alertMessage.value = error.response.data.message;
		alertType.value = "error";
		alertValue.value = true;
	} finally {
		loading.value = false;
	}
};

const filePath = computed(() => {
	const baseUrl = "http://localhost:3000/";
	return `${baseUrl}${kycDetails.value?.file_path}`;
});

const fetchKycDetails = async () => {
	try {
		loading.value = true;
		const response = await apiClient.get(`/kyc/${route.params.id}`);
		kycDetails.value = response.data.data;
	} catch (error: any) {
		alertMessage.value = error.response.data.message;
		alertType.value = "error";
		alertValue.value = true;
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	fetchKycDetails();
});
</script>

<template>
	<v-container fluid>
		<div class="mb-4">
			<v-alert
				:type="alertType"
				variant="tonal"
				:text="alertMessage"
				:model-value="alertValue"
			/>
		</div>

		<div
			v-if="loading"
			class="d-flex justify-center align-center"
			style="min-height: 200px"
		>
			<v-progress-circular
				indeterminate
				color="primary"
			></v-progress-circular>
		</div>

		<v-card class="pa-4">
			<v-card-title class="text-h5 mb-4">
				KYC Details
				<v-chip
					class="ml-4"
					:color="
						kycDetails?.status === 'approved'
							? 'success'
							: kycDetails?.status === 'rejected'
								? 'error'
								: 'warning'
					"
				>
					{{ kycDetails?.status }}
				</v-chip>
			</v-card-title>

			<v-row>
				<v-col cols="12" md="6">
					<KycDetails :kycDetails="kycDetails" />
				</v-col>
				<v-col cols="12" md="6">
					<KycDetailsDocument :filePath="filePath" />
					<KycDetailsActions
						@updateStatus="updateStatus"
						:show="isAdmin && kycDetails?.status === 'pending'"
					/>
				</v-col>
				<v-col>
					<v-btn
						:href="filePath"
						target="_blank"
						rel="noopener noreferrer"
						color="secondary"
					>
						View File
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<style scoped></style>
