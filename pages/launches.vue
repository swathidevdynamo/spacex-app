<template>
  <div>
    <router-link to="/">Back</router-link>
    <h1>SpaceX Launches</h1>
    <!-- Loader UI while adding a new item -->
    <div v-if="store.adding" class="loader">Adding...</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(launch, index) in store.paginatedLaunches" :key="launch.id">
          <td>{{ (store.currentPage - 1) * store.itemsPerPage + index + 1 }}</td>
          <td>{{ launch.name }}</td>
          <td>{{ new Date(launch.date_utc).toLocaleDateString() }}</td>
          <td>
            <button @click="saveLaunchData(launch)">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="store.prevPage" :disabled="store.currentPage === 1">Previous</button>
      <span>Page {{ store.currentPage }} of {{ store.totalPages }}</span>
      <button @click="store.nextPage" :disabled="store.currentPage === store.totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLaunchStore } from '~/stores/launches';

const store = useLaunchStore();

onMounted(() => {
  store.fetchLaunches();
});

const saveLaunchData = (launch) => {
  store.addLaunch({ data: launch });
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
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}

.loader {
  text-align: center;
  font-size: 1.5em;
  padding: 20px;
}
</style>
