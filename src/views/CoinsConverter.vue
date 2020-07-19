<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col cols="9" sm="8">
        <v-col>
          <v-card>
            <v-card-title>
              Absolute value to Coins stacks
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="grey"
                    class="pl-2"
                  >mdi-help-circle
                  </v-icon>
                </template>
                <span>Type how much money you have that we convert it into coins stacks!</span>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3">
              <v-text-field type="number" v-model="value" @change="goldToStacks" dense outlined
                            append-icon="mdi-currency-usd"/>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              Coins stacks to absolute value
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="grey"
                    class="pl-2"
                  >mdi-help-circle
                  </v-icon>
                </template>
                <span>Fill your coins stacks quantity and we convert it to the absolute total value!</span>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3">
              <v-row no-gutters
                     style="border: red 1px"
                     v-for="coin in coins"
                     :key="coin.name">
                <v-col cols="2">
                  <v-avatar size="48" rounded="2" color="grey lighten-3">
                    <img :src="coin.src">
                  </v-avatar>
                </v-col>
                <v-col cols="4" class="pb-6" align-self="center">
                  {{coin.name}}
                </v-col>
                <v-col cols="6">
                  <v-text-field :placeholder="`${coin.name} quantity`" type="number" v-model="coin.qtd" dense outlined
                                @change="stacksToGold"/>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="shouldShowCommands">
          <v-card>
            <v-card-title>
              Generated commands
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="grey"
                    class="pl-2"
                  >mdi-help-circle
                  </v-icon>
                </template>
                <span>Here we have some generated commands based on your results!</span>
              </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text class="mt-3">
              <v-row>
                <v-col :key="command" v-for="command in commands">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        v-clipboard="() => `${command} ${oldValue}`"
                        v-text="`${command} ${oldValue}`"
                        class="my-2"
                        outlined
                        block
                      />
                    </template>
                    <span>Click to copy to clipboard!</span>
                  </v-tooltip>
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
  export default {
    name: "CoinsConverter",
    data: () => ({
      value: 0,
      oldValue: 0,
      MAX_STACK_QUANTITY: 100,
      commands: [
        '!deposit',
        '!withdraw'
      ],
      coins: [
        {name: 'Red Coin', value: 100000000, qtd: 0, src: 'https://www.tibiawiki.com.br/images/9/99/Assassin_Star.gif'},
        {name: 'Green Coin', value: 1000000, qtd: 0, src: 'https://www.tibiawiki.com.br/images/d/d0/Green_Light.gif'},
        {name: 'Crystal Coin', value: 10000, qtd: 0, src: 'https://www.tibiawiki.com.br/images/5/55/Crystal_Coin.gif'},
        {name: 'Platinum Coin', value: 100, qtd: 0, src: 'https://www.tibiawiki.com.br/images/f/f8/Platinum_Coin.gif'},
        {name: 'Gold Coin', value: 1, qtd: 0, src: 'https://www.tibiawiki.com.br/images/b/b0/Gold_Coin.gif'}
      ]
    }),
    computed: {
      shouldShowCommands() {
        return this.oldValue !== 0
      }
    },
    mounted() {
      console.log(require('@/assets/itens.json'));
    },
    methods: {
      goldToStacks() {
        this.oldValue = Number(this.value)
        this.value = Math.abs(this.value)
        this.coins.forEach(coin => {
          coin.qtd = Math.max(0, coin.qtd);
          coin.qtd = Math.floor(this.value / coin.value)
          this.value -= coin.qtd * coin.value
        })
      },
      stacksToGold() {
        this.value = this.coins.reduce((acc, stack) => {
          stack.qtd = Math.max(0, stack.qtd);
          return acc += stack.value * stack.qtd
        }, 0)
        this.oldValue = Number(this.value)
      },
    },
  }
</script>
