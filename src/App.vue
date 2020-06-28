<template>
  <div id="app">
    <el-row :gutter="10" justify="center" type="flex">
      <el-col :xs="24" :sm="12">
        <el-card class="box-card">
          <div slot="header">
            <span>Absolute value to Coins stacks</span>
          </div>
          <el-row type="flex" justify="center">
            <el-input type="text" v-model="value" @change="goldToStacks" controls-position="right" :min="0"/>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header">
            <span>Coins stacks to absolute value</span>
          </div>
          <div>
            <el-form label-width="105px">
              <el-row v-for="coin in coins" :key="coin.name" justify="left" type="flex">
                <el-avatar shape="square" size="large" />
                <el-form-item :label="coin.name">
                  <el-input :placeholder="`${coin.name} quantity`" v-model="coin.qtd" @change="stacksToGold"/>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card" v-if="oldValue">
          <div slot="header">
            <span>Commands</span>
          </div>
          <el-row type="flex" justify="center">
            <el-popover
              v-for="command in commands"
              :key="command"
              placement="top-start"
              trigger="hover"
              content="Click to copy to clipboard">
              <el-button slot="reference" v-clipboard="() => `${command} ${oldValue}`"
                         v-text="`${command} ${oldValue}`"/>
            </el-popover>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      value: 0,
      oldValue: 0,
      MAX_STACK_QUANTITY: 100,
      commands: [
        '!deposit',
        '!withdraw'
      ],
      coins: [
        {name: 'Red Coin', value: 100000000, qtd: 0},
        {name: 'Green Coin', value: 1000000, qtd: 0},
        {name: 'Crystal Coin', value: 10000, qtd: 0},
        {name: 'Platinum Coin', value: 100, qtd: 0},
        {name: 'Gold Coin', value: 1, qtd: 0}
      ]
    }),
    methods: {
      goldToStacks() {
        this.oldValue = this.value
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
        this.oldValue = this.value
      },
    },
  }
</script>
