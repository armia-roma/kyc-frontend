<script setup lang="ts"></script>
<template>
  <v-container>
    <v-navigation-drawer color="grey-lighten-5" class="text-grey-lighten-1" width="150" permanent>
      <v-list-item link title="Create Kyc" to="admin/kyc-create"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-container>
</template>
