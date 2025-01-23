<script setup lang="ts">
import { ref } from 'vue'
import apiClient from '../../service/api-client'

const email = ref('')
const fullName = ref('')
const mobileNumber = ref('')
const homeAddress = ref('')
const file = ref<File | null>(null)
const fileRules = [
  (v: any) => {
    const files = v
    return files?.length > 0 || 'File is required'
  },
]
const valid = ref(false)
const handleSubmit = async () => {
  if (!valid.value) {
    return
  }

  const formData = new FormData()
  formData.append('full_name', fullName.value)
  formData.append('email', email.value)
  formData.append('address', homeAddress.value)
  formData.append('phone_number', mobileNumber.value)
  if (file.value) {
    formData.append('file', file.value)
  }

  try {
    const response = await apiClient.post('/kyc/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <v-container>
    <v-sheet class="ml-12" max-width="500">
      <v-form @submit.prevent="handleSubmit" v-model="valid">
        <v-row>
          <v-col class="mb-5">
            <h4 class="text-h4">create Kyc</h4>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Full Name"
              variant="outlined"
              v-model="fullName"
              hide-details="auto"
              density="compact"
              class="mb-2"
              :rules="[(v) => !!v || 'full Name is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              label="Email"
              v-model="email"
              hide-details="auto"
              density="compact"
              class="mb-2"
              :rules="[(v) => !!v || 'Email is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="12">
            <v-file-input
              label="Upload Document"
              variant="outlined"
              hide-details="auto"
              placeholder="Select your file"
              prepend-icon=""
              density="compact"
              v-model="file"
              @change="file = $event.target?.files?.[0] || null"
              accept="image/*,.pdf"
              class="mb-2"
              :rules="fileRules"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Address"
              variant="outlined"
              v-model="homeAddress"
              hide-details="auto"
              density="compact"
              class="mb-2"
              :rules="[(v) => !!v || 'Address is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Mobile Number"
              variant="outlined"
              v-model="mobileNumber"
              hide-details="auto"
              density="compact"
              class="mb-2"
              :rules="[(v) => !!v || 'Mobile Number is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-btn type="submit" block color="primary" size="large">Create Kyc</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>
