<template>
    <nav>
      <nuxt-link to="/launches">Launch List</nuxt-link>
      <nuxt-link to="/saved-launches">Saved Launches</nuxt-link>
    </nav>
    <h1>This app shows spacex launch data</h1>
</template>
  
<script>
export default {
name: 'HomePage'
}
</script>
<style scoped>
nav {
  display: flex;
  gap: 20px;
}
</style>