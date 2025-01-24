<script setup lang="ts">
import { ref } from 'vue'

const userName = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const loading = ref(false)
const valid = ref(false)
const alertMessage = ref('')
const status = ref<'success' | 'info' | 'warning' | 'error'>('info')
const showAlert = ref(false)
const hideAlert = () => {
  setTimeout(() => {
    showAlert.value = false
  }, 3000) // 3000ms = 3 seconds
}
import { register } from './../../service/authService'
import router from '@/router'

async function handleSubmit() {
  console.log(valid.value)
  if (valid.value) {
    loading.value = true
    try {
      await register({
        userName: userName.value,
        email: email.value,
        password: password.value,
        role: role.value,
      }).then((res: any) => {
        if (res.status === 400) {
          loading.value = false
          showAlert.value = true
          alertMessage.value = res.response.data.message
          status.value = 'error'
          hideAlert()
          return
        } else {
          loading.value = false
          alertMessage.value = res.message
          status.value = 'success'
          showAlert.value = true
          hideAlert()
        }

        if (res.data && res.data.role === 'user') {
          router.push({ name: 'kycCreate' })
        }
      })
    } catch (err) {
      loading.value = false
      alertMessage.value = err.message
      status.value = 'error'
      showAlert.value = true
      hideAlert()
    } finally {
      loading.value = false
    }
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
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" class="text-center">
        <v-alert
          :type="status"
          variant="tonal"
          :text="alertMessage"
          :model-value="showAlert"
        ></v-alert>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" class="text-center">
        <v-card
          class="pa-4 mx-auto"
          width="100%"
          max-width="500"
          title="Register User"
          :loading="loading"
        >
          <v-form @submit.prevent="handleSubmit" v-model="valid">
            <v-card>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="User Name"
                    hide-details="auto"
                    v-model="userName"
                    :rules="[(v) => !!v || 'User Name is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
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
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    variant="outlined"
                    label="Role"
                    v-model="role"
                    :rules="[(v) => !!v || 'Role is required']"
                    :items="['user', 'admin']"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card-actions>
                    <v-btn block color="primary" type="submit">Register</v-btn>
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
