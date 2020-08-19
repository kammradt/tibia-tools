<template>
  <v-speed-dial absolute direction="bottom" right class="mr-12">
    <template v-slot:activator>
      <v-btn icon large>
        <v-icon v-text="'mdi-earth'"/>
      </v-btn>
    </template>
    <v-btn :key="language.lang"
           @click="setLanguageTo(language.lang)" class="title"
           rounded
           small
           v-for="language in languages"
           v-text="language.emoji"/>
    <v-btn class="title" href="https://github.com/kammradt/tibia-tools" link rounded small target="_blank">
      <v-icon v-text="'mdi-xml'"/>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data: () => ({
    languages: [
      {emoji: 'brrrr', lang: 'br'},
      {emoji: 'ennn', lang: 'en'},
    ]
  }),
  methods: {
    setLanguageTo(language) {
      this.$i18n.locale = language
      this.$root.$i18n.locale = language
    },
  }
}
</script>
