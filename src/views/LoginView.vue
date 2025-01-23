<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const loading = ref(false)
import { login } from './../../service/authService'
import router from '@/router'

async function handleSubmit() {
  if (!valid.value) {
    return
  }
  loading.value = true
  try {
    await login({ email: email.value, password: password.value }).then((user: any) => {
      if (user && user.role === 'user') {
        router.push({ name: 'kycCreate' })
      }
    })
  } catch (err) {
    loading.value = false
  } finally {
    loading.value = false
  }
}

const valid = ref(false)
</script>
<template>
  <v-container class="fill-height">
    <v-row class="">
      <v-col class="">
        <v-card class="pa-8" width="100%" max-width="500" title="Login" :loading="loading">
          <v-form @submit.prevent="handleSubmit" v-model="valid">
            <v-card variant="flat" class="pa-4">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="Email"
                    hide-details="auto"
                    v-model="email"
                    :rules="[(v) => !!v || 'Email is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Password is required']"
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
