<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col lg="9">
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{ $t('ds.log-to-statistics.title') }}
              <v-spacer/>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon class="pl-2" color="grey" small v-on="on" v-text="'mdi-help-circle'"/>
                </template>
                <span v-text="$t('ds.log-to-statistics.tooltip')"/>
              </v-tooltip>
            </v-card-title>
            <v-divider />
            <v-card-text class="mt-3">
              <v-textarea
                dense
                outlined
                :placeholder="logPlaceholder"
                v-model="log"
                @change="logToStatistics"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{$t('ds.resume.title')}}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" color="grey" class="pl-2" v-text="'mdi-help-circle'" />
                </template>
                <span v-text="$t('ds.resume.tooltip')" />
              </v-tooltip>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <p class="title" v-text="$t('ds.damage.dealt')" />
              <v-row
                no-gutters
                align="center"
                v-for="statistic in statisticsOfDamageDealt"
                :key="statistic.name"
              >
                <v-col cols="2" class="pb-6" v-text="statistic.name" />
                <v-col cols="10">
                  <v-text-field
                    :placeholder="`${statistic.name} result`"
                    type="text"
                    v-model="statistic.value"
                    dense
                    outlined
                    readonly
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <p class="title" v-text="$t('ds.damage.received')" />
              <v-row
                no-gutters
                align="center"
                v-for="statistic in statisticsOfDamageReceived"
                :key="statistic.name"
              >
                <v-col cols="2" class="pb-6" v-text="statistic.name" />
                <v-col cols="10">
                  <v-text-field
                    :placeholder="`${statistic.name} result`"
                    type="text"
                    v-model="statistic.value"
                    dense
                    outlined
                    readonly
                  />
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
import {placeholder} from "../helpers/placeholder-helper";

export default {
  name: "DamageStatisticsView",
  data() {
    return {
      logPlaceholder: placeholder,
      log: "",
      damageDealtRecords: [],
      damageReceivedRecords: [],
      statisticsOfDamageDealt: [
        {name: "Mean", value: 0, calculate: this.calculateMean},
        {name: "Min", value: 0, calculate: this.calculateMin},
        {name: "Max", value: 0, calculate: this.calculateMax},
      ],
      statisticsOfDamageReceived: [
        {name: "Mean", value: 0, calculate: this.calculateMean},
        { name: "Min", value: 0, calculate: this.calculateMin },
        { name: "Max", value: 0, calculate: this.calculateMax },
      ],
    };
  },
  methods: {
    logToStatistics() {
      this.damageDealtRecords = [];
      this.damageReceivedRecords = [];

      this.textLogToList();

      this.statisticsOfDamageDealt.forEach((s) => {
        s.value = s.calculate(this.damageDealtRecords);
      });
      this.statisticsOfDamageReceived.forEach((s) => {
        s.value = s.calculate(this.damageReceivedRecords);
      });
    },
    textLogToList() {
      this.log
        .split("\n")
        .filter((line) => line.includes("due to"))
        .forEach((line) => {
          this.damageDealt(line)
            ? this.damageDealtRecords.push(this.getDamageDealtRecord(line))
            : this.damageReceivedRecords.push(
                this.getDamageReceivedRecord(line)
              );
        });
    },
    damageDealt(line) {
      return line.includes("loses");
    },
    getDamageDealtRecord(line) {
      return {
        name: this.getTargetName(line),
        damage: this.getDamageDealt(line),
      };
    },
    getTargetName(line) {
      return line.slice(line.indexOf("A") + 2, line.indexOf("loses")).trim();
    },
    getDamageDealt(line) {
      return parseInt(
        line.slice(line.indexOf("loses") + 5, line.indexOf("hitpoints")).trim()
      );
    },
    getDamageReceivedRecord(line) {
      return {
        name: this.getAttackerName(line),
        damage: this.getDamageReceived(line),
      };
    },
    getAttackerName(line) {
      return line.slice(line.indexOf("by a ") + 5).trim();
    },
    getDamageReceived(line) {
      const getEndOfLine = (line) =>
        line.includes("mana") ? "mana" : "hitpoints";
      return parseInt(
        line
          .slice(
            line.indexOf("You lose ") + 9,
            line.indexOf(getEndOfLine(line))
          )
          .trim()
      );
    },
    calculateMean(recordList) {
      return (
        recordList.reduce((acc, { damage }) => acc + damage, 0) /
        recordList.length
      ).toFixed(2);
    },
    calculateMin(recordList) {
      return Math.min
        .apply(
          Math,
          recordList.map(({ damage }) => damage)
        )
        .toFixed(2);
    },
    calculateMax(recordList) {
      return Math.max
        .apply(
          Math,
          recordList.map(({ damage }) => damage)
        )
        .toFixed(2);
    },
  },
};
</script>
