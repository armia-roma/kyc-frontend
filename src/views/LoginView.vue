<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')

import { login } from './../../service/authService'

function handleSubmit() {
  login({ email: email.value, password: password.value }).then()
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
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col>
        <v-form @submit.prevent="handleSubmit" v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                variant="outlined"
                label="Email"
                v-model="email"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
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
            <v-col cols="12" md="4">
              <v-btn block flat color="gray" variant="outlined" type="submit"> Login </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
