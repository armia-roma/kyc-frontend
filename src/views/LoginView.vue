<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const loading = ref(false)
import { login } from './../../service/authService'

async function handleSubmit() {
  loading.value = true
  try {
    await login({ email: email.value, password: password.value })
  } catch (err) {
    loading.value = false
  } finally {
    loading.value = false
  }
}
const nameRules = [
  (value: string) => {
    if (value) return true

    return 'Name is required.'
  },
]
const passwordRules = [
  (value: string) => {
    if (value) return true

    return 'Name is required.'
  },
]
const valid = false
</script>
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row class="">
      <v-col class="d-flex align-center">
        <v-card class="pa-4 mx-auto" width="100%" max-width="500" title="Login" :loading="loading">
          <v-form @submit.prevent="handleSubmit" v-model="valid">
            <v-card>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="Email"
                    hide-details="auto"
                    v-model="email"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    variant="outlined"
                    :rules="passwordRules"
                    v-model="password"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card-actions>
                    <v-btn block color="primary" type="submit">Login</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
