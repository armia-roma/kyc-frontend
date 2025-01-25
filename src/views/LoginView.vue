<script setup lang="ts">
type Status = "error" | "success" | "info" | "warning" | undefined;

import {login} from "./../../service/authService";
import {ref} from "vue";
import router from "@/router";
const email = ref("");
const password = ref("");
const loading = ref(false);
const valid = ref(false);

const status = ref<Status>("error");
const alertMessage = ref();
const showAlert = ref(false);

function handleSubmit() {
	if (!valid.value) {
		return;
	}
	loading.value = true;

	login({email: email.value, password: password.value})
		.then((data: any) => {
			showAlert.value = true;
			status.value = "success";
			alertMessage.value = data.message;
			if (data.user && data.user.role === "user") {
				console.log(data);
				router.push({
					name: "kycUserCreate",
					query: {role: data.user.role},
				});
			}
			if (data.user && data.user.role === "admin") {
				router.push({name: "kycList", query: {role: data.user.role}});
			}
		})
		.catch((err: any) => {
			loading.value = false;
			showAlert.value = true;
			status.value = "error";
			alertMessage.value = err.response.data.message || err;
		})
		.finally(() => {
			loading.value = false;
		});
}
const navigateToRegister = () => {
	console.log("navigate to register");
	router.push({name: "register"});
};
</script>
<template>
	<v-container class="mx-auto" fluid>
		<v-row justify="center">
			<v-col cols="12" md="6" align-self="center">
				<v-alert
					:type="status"
					variant="tonal"
					:text="alertMessage"
					:model-value="showAlert"
				></v-alert>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" md="6" align-self="center">
				<v-card
					class="pa-8"
					width="100%"
					title="Login"
					:loading="loading"
				>
					<v-form @submit.prevent="handleSubmit" v-model="valid">
						<v-card variant="flat" class="pa-4">
							<v-row>
								<v-col cols="12">
									<v-text-field
										variant="outlined"
										label="Email"
										hide-details="auto"
										v-model="email"
										:rules="[
											(v) => !!v || 'Email is required',
										]"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field
										label="Password"
										variant="outlined"
										:rules="[
											(v) =>
												!!v || 'Password is required',
										]"
										v-model="password"
										type="password"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-card-actions>
										<v-btn
											block
											color="primary"
											type="submit"
											>Login</v-btn
										>
									</v-card-actions>
								</v-col>
							</v-row>
						</v-card>
					</v-form>
					<v-col cols="12" md="12">
						<v-btn flat @click="navigateToRegister">
							register
						</v-btn>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped></style>
