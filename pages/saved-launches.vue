<template>
  <div>
    <router-link to="/">Back</router-link>
    <div v-if="loading" class="loader">Deleting...</div>
    <h1>Saved Launches</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(launch, index) in savedLaunches" :key="launch._id">
          <td>{{ index + 1 }}</td>
          <td>{{ launch.data?.name ?? 'N/A' }}</td>
          <td>{{ launch.data?.date_utc ? new Date(launch.data.date_utc).toLocaleDateString() : 'N/A' }}</td>
          <td>
            <button @click="deleteLaunch(launch._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useLaunchStore } from '~/stores/launches';

export default {
  setup() {
    const store = useLaunchStore();
    const loading = ref(false);
    const savedLaunches = ref([]);

    onMounted(() => {
      fetchSavedLaunches();
    });

    const fetchSavedLaunches = async () => {
      loading.value = true;
      await store.fetchSavedLaunches();
      savedLaunches.value = store.savedLaunches;
      loading.value = false;
    };

    const deleteLaunch = async (id) => {
      loading.value = true;
      await store.deleteLaunch(id);
      savedLaunches.value = store.savedLaunches;
      loading.value = false;
    };

    return {
      store,
      loading,
      savedLaunches,
      fetchSavedLaunches,
      deleteLaunch,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1a1a;
}

.loader {
  text-align: center;
  font-size: 1.5em;
  padding: 20px;
}
</style>
