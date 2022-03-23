<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col lg="9">
        <v-col>
          <v-card outlined>
            <v-card-title>
              {{ $t('cc.value-to-stacks.title') }}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon
                      class="pl-2"
                      color="grey"
                      small
                      v-on="on"
                      v-text="'mdi-help-circle'"
                  />
                </template>
                <span v-text="$t('cc.value-to-stacks.tooltip')"/>
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
              <v-row no-gutters
                     v-for="coin in coins"
                     :key="coin.name">
                <v-col cols="2">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-avatar v-on="on" size="48" rounded="2" color="grey lighten-3">
                        <img :src="coin.src" :alt="coin.name">
                      </v-avatar>
                    </template>
                    <span v-text="coin.value"/>
                  </v-tooltip>

                </v-col>
                <v-col cols="4" class="pb-6" align-self="center" v-text="coin.name"/>
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
              {{$t('cc.commands.title')}}
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
                <span v-text="$t('cc.commands.tooltip')"/>
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
                    <span v-text="$t('common.copy-to-clipboard')"/>
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
    name: 'CoinsConverterView',
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
    methods: {
      goldToStacks() {
        this.updateOldValue()
        this.value = Math.abs(this.value)
        this.coins.forEach(coin => {
          coin.qtd = Math.floor(Math.abs(this.value) / coin.value)
          this.value -= coin.qtd * coin.value
        })
      },
      stacksToGold() {
        this.value = this.coins.reduce((acc, stack) => acc += stack.value * Math.abs(stack.qtd), 0)
        this.updateOldValue()
      },
      updateOldValue() {
        this.oldValue = Number(this.value)
      }
    },
  }
</script>
