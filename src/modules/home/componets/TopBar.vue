<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <v-btn :to="{name: 'HomeView'}" exact icon>
      <v-icon v-text="'mdi-home'"/>
    </v-btn>

    <v-toolbar-title style="cursor: pointer">
      <router-link
          :style="{ cursor: 'pointer'}"
          :to="{name: 'HomeView'}"
          class="title"
          exact
          tag="span" v-text="'Tibia Tools'"/>
    </v-toolbar-title>

    <v-spacer/>

    <LanguageSwitcher/>
  </v-app-bar>
</template>
<script>
import LanguageSwitcher from "@/modules/common/components/LanguageSwitcher";

export default {
  name: 'top-bar',
  components: {LanguageSwitcher},
  data: () => ({
    sideMenuLinks: [
      {
        link: 'HomeView',
        icon: 'mdi-home',
        text: 'common.home'
      },
      {
        link: 'SettingsView',
        icon: 'mdi-cog',
        text: 'common.settings'
      }
    ]
  }),
  methods: {
    goToHome() {
      this.$router.push({name: 'HomeView'});
    }
  }
}
</script>