<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '../../service/api-client'

interface KycDetails {
  _id: string
  full_name: string
  email: string
  phone_number: string
  address: string
  file_path: string
  status: string
  createdAt: string
}

const route = useRoute()
const kycDetails = ref<KycDetails | null>(null)
const loading = ref(true)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const updateStatus = async (status: string) => {
  try {
    if (status === 'approved') {
      const response = await apiClient.put(`/kyc/approve/${route.params.id}`, { status })
      console.log(response)
    }
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

onMounted(async () => {
  try {
    const response = await apiClient.get(`/kyc/${route.params.id}`)
    kycDetails.value = response.data.data
  } catch (error) {
    console.error('Error fetching KYC details:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <container>
    <v-container v-if="!loading && kycDetails">
      <v-card class="mx-auto pa-4">
        <v-card-title class="text-h5 mb-4">
          KYC Details
          <v-chip
            class="ml-4"
            :color="
              kycDetails.status === 'approved'
                ? 'success'
                : kycDetails.status === 'rejected'
                  ? 'error'
                  : 'warning'
            "
          >
            {{ kycDetails.status }}
          </v-chip>
        </v-card-title>

        <v-row>
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-account"></v-icon>
                </template>
                <v-list-item-title>Full Name</v-list-item-title>
                <v-list-item-subtitle>{{ kycDetails.full_name }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-email"></v-icon>
                </template>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ kycDetails.email }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-phone"></v-icon>
                </template>
                <v-list-item-title>Phone Number</v-list-item-title>
                <v-list-item-subtitle>{{ kycDetails.phone_number }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-map-marker"></v-icon>
                </template>
                <v-list-item-title>Address</v-list-item-title>
                <v-list-item-subtitle>{{ kycDetails.address }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-clock"></v-icon>
                </template>
                <v-list-item-title>Submitted On</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(kycDetails.createdAt) }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="mb-4">
              <v-card-title>Document</v-card-title>
              <v-card-text>
                <v-img
                  :src="kycDetails.file_path"
                  cover
                  height="300"
                  class="bg-grey-lighten-2"
                ></v-img>
              </v-card-text>
            </v-card>

            <v-card-actions class="justify-center">
              <v-btn
                v-if="kycDetails.status === 'pending'"
                color="success"
                class="mr-2"
                @click="updateStatus('approved')"
              >
                Approve
              </v-btn>
              <v-btn
                v-if="kycDetails.status === 'pending'"
                color="error"
                @click="updateStatus('rejected')"
              >
                Reject
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <div v-else-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-alert type="error"> Failed to load KYC details </v-alert>
    </div>
  </container>
</template>

<style scoped></style>
