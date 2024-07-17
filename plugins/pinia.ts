// plugins/pinia.js
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  // No need to assign pinia to nuxtApp, it's automatically available in components
});
