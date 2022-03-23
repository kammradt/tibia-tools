<template>
    <v-container>
      <v-row align="start" justify="center">
        <v-col lg="9">
          <v-col>
            <v-card outlined>
              <v-card-title>
                {{ $t('ct.create.title') }}
                <v-spacer/>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon class="pl-2" color="grey" small v-on="on" v-text="'mdi-help-circle'"/>
                  </template>
                  <span v-text="$t('ct.create.tooltip')"/>
                </v-tooltip>
              </v-card-title>
              <v-divider />
              <v-card-text class="mt-3">
                <v-textarea
                    dense
                    outlined
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "ConsumablesTimerView"
}
</script>

<style scoped>

</style>