import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#B32831',
      },
      dark: {
        primary: '#B32831',
      },
    },
  },
})
