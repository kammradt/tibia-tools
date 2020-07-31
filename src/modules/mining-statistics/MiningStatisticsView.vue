<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col cols="9" sm="8">
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{$t('mr.log-to-statistics.title')}}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="grey"
                    class="pl-2"
                    v-text="'mdi-help-circle'"
                  />
                </template>
                <span v-text="$t('mr.log-to-statistics.tooltip')"/>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3">
              <v-textarea dense outlined :placeholder="logPlaceholder" v-model="logPlaceholder" @change="logToStatistics"/>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{$t('cc.stacks-to-value.title')}}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="grey"
                    class="pl-2"
                    v-text="'mdi-help-circle'"
                  />
                </template>
                <span v-text="$t('cc.stacks-to-value.tooltip')"/>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3">
              <v-row no-gutters v-for="coin in statistics" :key="coin.name">
                <v-col cols="2">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-avatar v-on="on" size="48" rounded="2" color="grey lighten-3">
                        <img :src="'https://www.tibiawiki.com.br/images/2/23/Small_Enchanted_Amethyst.gif'" :alt="coin.name">
                      </v-avatar>
                    </template>
                    <span v-text="coin.name"/>
                  </v-tooltip>
                </v-col>
                <v-col cols="4" class="pb-6" align-self="center" v-text="coin.name"/>
                <v-col cols="3">
                  <span v-text="`${coin.perHour} per hour`" />
                </v-col>
                <v-col cols="3">
                  <span v-text="`${coin.perHour * 24} per day`" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from "moment";

  export default {
    name: 'MiningStatisticsView',
    data: () => ({
      log: '',
      logPlaceholder: `15:35 [MINING] You have found a small enchanted ruby.
15:35 [MINING] You have found a small enchanted sapphire.
15:36 [MINING] You have found a small sapphire.
15:37 [MINING] You have found a small amethyst.
15:37 [MINING] You have found a small enchanted sapphire.
15:37 [MINING] You have found a small enchanted sapphire.
15:38 [MINING] You have found a small enchanted sapphire.
15:38 [MINING] You have found a small amethyst.
15:38 [MINING] You have found a small ruby.
15:38 [MINING] You have found a small sapphire.
15:39 [MINING] You have found a small ruby.
15:39 [MINING] You have found a small enchanted sapphire.
15:39 [MINING] You have found a small enchanted ruby.
15:40 [MINING] You have found a small enchanted emerald.
15:41 [MINING] You have found a small enchanted sapphire.
15:42 [MINING] You have found a small enchanted sapphire.
15:43 [MINING] You have found a small ruby.
15:43 [MINING] You have found a white pearl.
15:44 [MINING] You have found a small enchanted amethyst.
15:46 [MINING] You have found a small enchanted amethyst.
15:46 [MINING] You have found a small enchanted emerald.
15:47 [MINING] You have found a small ruby.
15:47 [MINING] You have found a small enchanted ruby.
15:47 [MINING] You have found a small ruby.
15:47 [MINING] You have found a Pepita de Ouro.
15:49 [MINING] You have found a small enchanted emerald.
15:49 [MINING] You have found a small enchanted ruby.
15:49 [MINING] You have found a small enchanted sapphire.
15:50 [MINING] You have found a small enchanted sapphire.
15:50 [MINING] You have found a small ruby.
15:50 [MINING] You have found a small emerald.
15:50 [MINING] You have found a white pearl.
15:51 [MINING] You have found a small enchanted sapphire.
15:51 [MINING] You have found a small enchanted sapphire.
15:52 [MINING] You have found a small emerald.
15:52 [MINING] You have found a small enchanted ruby.
15:53 [MINING] You have found a small diamond.
15:53 [MINING] You have found a small sapphire.
15:53 [MINING] You have found a small enchanted emerald.
15:53 [MINING] You have found a small emerald.
15:54 [MINING] You have found a small enchanted sapphire.
15:56 [MINING] You have found a small sapphire.
15:56 [MINING] You have found a small emerald.
15:56 [MINING] You have found a Pepita de Ouro.
15:56 [MINING] You have found a small enchanted ruby.
15:57 [MINING] You have found a small enchanted emerald.
15:57 [MINING] You have found a small enchanted sapphire.
15:57 [MINING] You have found a small enchanted sapphire.
15:57 [MINING] You have found a small enchanted ruby.
15:58 [MINING] You have found a small enchanted emerald.
15:58 [MINING] You have found a small sapphire.
15:59 [MINING] You have found a small emerald.
16:00 [MINING] You have found a small enchanted ruby.
16:00 [MINING] You have found a small ruby.
16:00 [MINING] You have found a small enchanted sapphire.
16:01 [MINING] You have found a white pearl.
16:01 [MINING] You have found a small enchanted amethyst.
16:01 [MINING] You have found a small enchanted amethyst.
16:01 [MINING] You have found a small enchanted sapphire.
16:01 [MINING] You have found a small enchanted emerald.
16:01 [MINING] You have found a white pearl.
16:01 [MINING] You have found a white pearl.
16:03 [MINING] You have found a small enchanted sapphire.
16:03 [MINING] You have found a white pearl.
16:03 [MINING] You have found a small emerald.
16:03 [MINING] You have found a small sapphire.
16:04 [MINING] You have found a Pepita de Ouro.
16:04 [MINING] You have found a small sapphire.
16:06 [MINING] You have found a small ruby.
16:06 [MINING] You have found a white pearl.
16:06 [MINING] You have found a small enchanted sapphire.
16:08 [MINING] You have found a small enchanted sapphire.
16:08 [MINING] You have found a white pearl.
16:08 [MINING] You have found a small enchanted sapphire.
16:08 [MINING] You have found a small amethyst.
16:09 [MINING] You have found a small emerald.
16:09 [MINING] You have found a white pearl.
16:10 [MINING] You have found a small ruby.
16:10 [MINING] You have found a small emerald.
16:11 [MINING] You have found a small enchanted sapphire.
16:11 [MINING] You have found a small enchanted emerald.
16:11 [MINING] You have found a small enchanted sapphire.
16:13 [MINING] You have found a Pepita de Ouro.
16:14 [MINING] You have found a small emerald.
16:14 [MINING] You have found a Pepita de Ouro.
16:16 [MINING] You have found a small enchanted sapphire.
16:16 [MINING] You have found a small emerald.
16:16 [MINING] You have found a Pepita de Ouro.
16:17 [MINING] You have found a small enchanted sapphire.
16:18 [MINING] You have found a small enchanted ruby.
16:19 [MINING] You have found a small sapphire.
16:20 [MINING] You have found a small enchanted sapphire.
16:20 [MINING] You have found a small enchanted amethyst.
16:20 [MINING] You have found a small diamond.
16:20 [MINING] You have found a small enchanted ruby.
16:20 [MINING] You have found a small enchanted emerald.
16:20 [MINING] You have found a small sapphire.
16:21 [MINING] You have found a small diamond.
16:21 [MINING] You have found a small enchanted ruby.
16:21 [MINING] You have found a small enchanted sapphire.
`,
      statistics: {}
    }),
    methods: {
      logToStatistics() {
        const ores = this.filterOres(this.logPlaceholder)
        const oreStatistics = this.oreListToStatistics(ores)
        const duration = this.getMiningDurationInHours(this.logPlaceholder)
        this.setQuantityPerHour(oreStatistics, duration)
        this.statistics = oreStatistics
      },
      filterOres(logText) {
        return this.toList(logText)
            .filter(this.validMiningLog)
            .map(this.getOreName)
            .map(this.removeLastCharacter)
      },
      toList(text) {
        return text.split('\n')
      },
      validMiningLog(logLine) {
        const SHOULD_CONTAIN = '[MINING]'
        return logLine.includes(SHOULD_CONTAIN)
      },
      getOreName(logLine) {
        const SLICE_AT = 'found a'
        return logLine.slice(logLine.indexOf(SLICE_AT) + SLICE_AT.length)
      },
      removeLastCharacter(text) {
        return text.slice(0, -1).trim();
      },
      setQuantityPerHour(oreWithQuantity, duration) {
        for (let ore of Object.keys(oreWithQuantity)) {
          oreWithQuantity[ore].perHour = (oreWithQuantity[ore].quantity / duration).toFixed(2)
        }
      },
      oreListToStatistics(logList) {
        const info = {}
        logList.forEach(ore => {
          if (info[ore]) {
            info[ore].quantity += 1
          } else {
            info[ore] = {quantity: 1, name: ore}
          }
        })
        return info
      },
      getMiningDurationInHours(logText) {
        let timeList = this.toList(logText)
            .filter(this.validMiningLog)
            .map(this.getTimeFromLogLine)

        const start = timeList[0]
        const end = timeList[timeList.length - 1]

        const [startHours, startMinutes] = start.split(':')
        const [endHours, endMinutes] = end.split(':')

        const endDuration = moment.duration({hours: endHours, minutes: endMinutes})
        const startDuration = moment.duration({hours: startHours, minutes: startMinutes})

        const interval = endDuration.subtract(startDuration)
        return interval.hours() + (interval.minutes() / 60)
      },
      getTimeFromLogLine(logLine) {
        const SLICE_AT = '[MINING]'
        return logLine.slice(0, logLine.indexOf(SLICE_AT)).trim()
      },
    }
  }
</script>
