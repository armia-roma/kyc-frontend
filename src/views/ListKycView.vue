<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiClient from '../../service/api-client'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = ref([])
const headers = [
  { title: 'Name', key: 'user.userName' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions' },
]

const handleClick = (item: any) => {
  router.push(`admin/kyc/${item._id}`)
}

onMounted(() => {
  apiClient.get('/kyc/list').then((response) => {
    items.value = response.data.data
  })
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>KYC List</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="items" pag hover items-per-page="-1">
          <template v-slot:item.actions="{ item }">
            <v-btn color="primary" variant="text" size="small" @click="handleClick(item)">
              View Details
            </v-btn>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip class="ma-2" :color="item.status === 'approved' ? 'green' : 'orange'">
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
