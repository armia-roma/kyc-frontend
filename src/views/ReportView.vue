<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiClient from '../../service/api-client'

interface KycStatus {
  status: string
  count: number
}

interface ReportSummary {
  kyc_status: KycStatus[]
  total_users: number
}

const summary = ref<ReportSummary>({ kyc_status: [], total_users: 0 })

onMounted(() => {
  apiClient.get('/report').then((response) => {
    console.log(response.data)
    summary.value = response.data
  })
})
</script>
<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" max-width="344" title="Total Kyc" link>
        <v-for v-for="item in summary.kyc_status">
          <v-chip
            class="ma-2"
            :color="
              item.status === 'approved'
                ? 'green'
                : item.status === 'rejected'
                  ? 'red'
                  : item.status === 'pending'
                    ? 'orange'
                    : 'grey'
            "
          >
            {{ item.count }} {{ item.status }}
          </v-chip>
        </v-for>
      </v-card>
    </v-col>
    <v-col>
      <v-card
        class="mx-auto"
        max-width="344"
        :subtitle="summary.total_users"
        title="Total Users"
        link
      ></v-card>
    </v-col>
  </v-row>
</template>
