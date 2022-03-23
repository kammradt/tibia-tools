<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col v-for="feature in features" :key="feature.link" cols="12">
          <v-card :to="{name: feature.link}" outlined>
            <v-card-title v-text="$t(feature.text)"/>
            <v-divider/>

            <v-card-text v-text="$t(feature.description)"/>
            <v-divider/>

            <v-card-text>
              <tag-category v-for="tag in feature.tags" :key="tag.text" :color="tag.color" :text="tag.text"/>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import TagCategory from "@/modules/home/componets/TagCategory";

const TAGS = {
  ot: {text: 'OT', color: 'primary'},
  global: {text: 'GLOBAL', color: 'secondary'}
}

export default {
  components: {TagCategory},
  data: () =>
      ({
        features: [
          {
            link: 'ConsumablesTimerView',
            text: 'ct.title',
            description: 'ct.description',
            tags: [TAGS.ot, TAGS.global]
          },
          {
            link: 'DamageStatisticsView',
            text: 'ds.title',
            description: 'ds.description',
            tags: [TAGS.ot, TAGS.global]
          },
          {
            link: 'CoinsConverterView',
            text: 'cc.title',
            description: 'cc.description',
            tags: [TAGS.ot, TAGS.global]
          },
          {
            link: 'MiningStatisticsView',
            text: 'mr.title',
            description: 'mr.description',
            tags: [TAGS.ot]
          },
        ]
      })
}
</script>
