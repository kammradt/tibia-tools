<template>
  <v-app id="app">
    <v-main class="pt-8">
      <top-bar/>

      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from '@/modules/home/componets/TopBar.vue'

export default {
  components: {
    TopBar
  },
  name: 'App'
}
</script>
