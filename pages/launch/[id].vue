<template>
  <div v-if="launch">
    <h1>{{ launch.name }}</h1>
    <p><strong>Date:</strong> {{ new Date(launch.date_utc).toLocaleDateString() }}</p>
    <p><strong>Details:</strong> {{ launch.details || 'No details available' }}</p>
    <NuxtLink to="/">Back to Launches</NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

const route = useRoute();
const launch = ref(null);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const response = await $api.get(`http://localhost:8005/launchservice/launches`);
    launch.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>
