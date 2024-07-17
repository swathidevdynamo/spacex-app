import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

interface Launch {
  _id: string;
  name: string;
  date_utc: string;
  // Add more properties as needed
}

const launchservice = `http://localhost:8005/launchservice`;

export const useLaunchStore = defineStore('launches', {
  state: () => ({
    savedLaunches: [] as Launch[],
    launches: [] as Launch[],
    loading: false,
    adding: false,
    currentPage: 1,
    itemsPerPage: 30,
  }),
  getters: {
    paginatedLaunches(state): Launch[] {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.launches.slice(start, end);
    },
    totalPages(state): number {
      return Math.ceil(state.launches.length / state.itemsPerPage);
    },
  },
  actions: {
    async fetchSavedLaunches(): Promise<void> {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api.get<Launch[]>(`${launchservice}/launch`);
        this.savedLaunches = response.data;
      } catch (error: any) {
        console.error('Error fetching saved launches:', error);
      } finally {
        this.loading = false;
      }
    },
    async addLaunch(newLaunch: Launch): Promise<void> {
      const { $api } = useNuxtApp();
      this.adding = true;
      try {
        const response = await $api.post<Launch>(`${launchservice}/save`, newLaunch);
        this.savedLaunches.push(response.data);
      } catch (error: any) {
        console.error('Error adding launch:', error);
      } finally {
        this.adding = false;
      }
    },
    async deleteLaunch(id: string): Promise<void> {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        await $api.delete(`${launchservice}/launch/${id}`);
        this.savedLaunches = this.savedLaunches.filter(launch => launch._id !== id);
      } catch (error: any) {
        console.error('Error deleting launch:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchLaunches(): Promise<void> {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api.get<Launch[]>('/launches');
        this.launches = response.data.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
      } catch (error: any) {
        console.error('Error fetching launches:', error);
      } finally {
        this.loading = false;
      }
    },
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
});
