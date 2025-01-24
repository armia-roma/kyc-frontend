<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-layout class="fill-height">
      <v-main style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
html,
body {
  height: 100%;
}
</style>
