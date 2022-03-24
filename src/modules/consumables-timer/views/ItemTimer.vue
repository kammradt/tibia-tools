<template>
  <v-card outlined :class="{'shake': playingAudio, 'rainbow-box': playingAudio}">
    <v-row class="px-2">
      <v-col class="pb-0 mb-0" cols="12">
        <v-row class="py-0 my-0">
          <v-col cols="6" class="py-0 my-0">
            <span class="subtitle-1 float-left" v-text="name"/>
          </v-col>
          <v-col cols="6" class="py-0 my-0">
            <span class="headline float-right" v-text="remainingTime"/>
          </v-col>
        </v-row>
      </v-col>
      <v-row class="px-3" justify="space-between">
        <v-col cols="6">
          <v-btn-toggle borderless>
            <v-btn v-if="paused" color="success" @click="start">
              <v-icon v-text="'mdi-play'"/>
            </v-btn>
            <v-btn v-else color="info" @click="restart">
              <v-icon v-text="'mdi-replay'"/>
            </v-btn>

            <v-btn :disabled="paused" color="warning" @click="pause">
              <v-icon v-text="'mdi-pause'"/>
            </v-btn>

            <v-btn @click="onDelete" color="error">
              <v-icon v-text="'mdi-delete'"/>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="6">
          <v-btn-toggle borderless class="float-right">
            <v-btn color="gray" @click="addOneMinute">
              <v-icon v-text="'mdi-plus'"/>
            </v-btn>

            <v-btn color="gray" @click="reduceOneMinute">
              <v-icon v-text="'mdi-minus'"/>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'item-timer',
  props: {
    id: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    remainingTime() {
      return new Date(this.remainingTimeInSeconds * 1000).toISOString().substr(11, 8)
    }
  },
  data() {
    return {
      paused: true,
      remainingTimeInSeconds: this.time,
      intervalId: null,
      audio: new Audio('http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'),
      playingAudio: false,
      playingAudioDuration: 4000,
    }
  },
  methods: {
    start() {
      if (this.paused) {
        this.paused = false
        this.intervalId = setInterval(this.reduceOneSecondFromRemainingTime, 1000)
      }
    },
    reduceOneSecondFromRemainingTime() {
      if (this.remainingTimeInSeconds > 1) {
        this.remainingTimeInSeconds -= 1
      } else {
        this.playSound()
        this.restart()
      }
    },
    addOneMinute() {
      const twentyFourHoursInSeconds = 86359
      if (this.remainingTimeInSeconds + 60 < twentyFourHoursInSeconds) {
        this.remainingTimeInSeconds += 60
      } else {
        this.remainingTimeInSeconds = twentyFourHoursInSeconds
      }
    },
    reduceOneMinute() {
      if (this.remainingTimeInSeconds > 60) {
        this.remainingTimeInSeconds -= 60
      } else {
        this.remainingTimeInSeconds = 0
      }
    },
    playSound() {
      this.audio.play()
      this.playingAudio = true
      setTimeout(() => {
        this.playingAudio = false
        this.audio.pause()
      }, this.playingAudioDuration)
    },
    restart() {
      this.paused = true
      this.remainingTimeInSeconds = this.time
      clearInterval(this.intervalId)
    },
    pause() {
      if (this.paused) {
        this.start()
      } else {
        this.paused = true
        clearInterval(this.intervalId)
      }
    },
    onDelete() {
      this.$emit('delete', this.id)
      clearInterval(this.intervalId)
    }
  },
}
</script>

<style scoped>
.shake {
  animation: shake 1.00s cubic-bezier(.36, .07, .19, .97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-5px, -5px, -5px);
  }
  20%, 80% {
    transform: translate3d(10px, 10px, 10px);
  }
  30%, 50%, 70% {
    transform: translate3d(-20px, -20px, -20px);
  }
  40%, 60% {
    transform: translate3d(20px, 20px, 20px);
  }
}
.rainbow-box {
  border: 3px solid;
  border-image: linear-gradient(10deg, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  border-image-slice: 1;
}
</style>