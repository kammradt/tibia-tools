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
              <v-textarea dense outlined :placeholder="logPlaceholder" v-model="log"
                          @change="logToStatistics"/>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{$t('mr.resume.title')}}
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
                <span v-text="$t('mr.resume.tooltip')"/>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text >
              <v-row no-gutters v-for="ore in oresInfo" :key="ore.name">
                <v-col cols="2">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-avatar v-on="on" size="48" rounded="2" color="grey lighten-3">
                        <img :src="ore.src" :alt="ore.name">
                      </v-avatar>
                    </template>
                    <span v-text="ore.name"/>
                  </v-tooltip>
                </v-col>
                <v-col cols="4" class="pb-6" align-self="center" v-text="ore.name"/>
                <v-col cols="3">
                  <span v-text="`${to2(ore.perHour)} per hour`"/>
                </v-col>
                <v-col cols="3">
                  <span v-text="`${to2(ore.perHour * 24)} per day`"/>
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
  import ores from '@/assets/ores.json'
  import ph from './placeholder-helper'

  export default {
    name: 'MiningStatisticsView',
    data: () => ({
      oresInfo: [...ores],
      log: '',
      logPlaceholder: ph(),
      statistics: {}
    }),
    methods: {
      logToStatistics() {
        this.resetInformation()
        this.oreListToStatistics(this.filterOres(this.log))
        this.setQuantityPerHour(this.getMiningDurationInHours(this.log))
      },
      resetInformation() {
        if (this.oresInfo.some(ore => ore.quantity !== 0)) {
          this.oresInfo = this.oresInfo.map(ore => ({...ore, quantity: 0, perHour: 0}))
        }
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
        return text.trim().slice(0, -1);
      },
      setQuantityPerHour(duration) {
        this.oresInfo.forEach(ore => {
          if (ore.quantity) {
            ore.perHour = (ore.quantity / duration)
          }
        })
      },
      oreListToStatistics(logList) {
        logList.forEach(ore => this.findOreByName(ore).quantity += 1)
      },
      findOreByName(name) {
        return this.oresInfo.find(ore => ore.name.toLowerCase() === name.toLowerCase())
      },
      getMiningDurationInHours(logText) {
        let timeList = this.toList(logText)
            .filter(this.validMiningLog)
            .map(this.getTimeFromLogLine)

        if (!timeList.length) return 0

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
      to2(value) {
        return value.toFixed(2)
      }
    },
  }
</script>
