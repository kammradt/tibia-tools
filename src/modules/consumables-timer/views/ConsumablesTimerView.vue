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
              <v-divider/>
              <v-card-text class="mt-3 pb-0">
                <v-autocomplete
                    v-model="item"
                    :items="items"
                    label="Escolha o item"
                    @change="handleItemChange"
                    outlined
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.text }}
                  </template>
                  <template slot="item" slot-scope="data">
                    {{ data.item.text }}
                  </template>
                </v-autocomplete>
              </v-card-text>
              <v-divider/>
              <v-card-text class="mt-2">
                <item-timer
                    v-for="selected in selectedItems"
                    :id="selected.id"
                    :key="selected.id"
                    :name="selected.itemName"
                    :time="selected.durationInSeconds"
                    class="mb-2"
                    @delete="handleDelete"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import {consumables} from "@/modules/consumables-timer/helpers/consumables-helper";
import ItemTimer from "@/modules/consumables-timer/views/ItemTimer";

export default {
  name: "ConsumablesTimerView",
  components: {ItemTimer},
  data: () => ({
    items: consumables,
    item: {},
    selectedItems: []
  }),
  methods: {
    handleDelete(id) {
      this.selectedItems = this.selectedItems.filter(item => item.id !== id);
    },
    clearItem() {
      this.item = {};
    },
    handleItemChange(item) {
      this.selectedItems.unshift({
        id: new Date().getTime().toString(),
        ...item
      });
      setTimeout(this.clearItem, 500)
    },
  },
}
</script>
