<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col cols="9" sm="8">
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{$t('common.settings')}}
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3" v-text="'🚧'" />
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'CoinsConverterView'
  }
</script>
