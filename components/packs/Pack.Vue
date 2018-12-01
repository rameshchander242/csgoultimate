<template>
  <div>
    <div class="pack-name">NAME</div>
    <v-divider></v-divider>
    <div class="pack-card">
      <img src="../../assets/img/card_template.png" />
    </div>
    <div class="pack-info">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Price</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ masterPack.price }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Amount</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ masterPack.cardAmount }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Gold</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ masterPack.minimumGoldAmount }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Players</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ masterPack.minimumPlayerAmount }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div class="pack-info">
      <v-btn large class="btn-success ma-0 full-width" @click="buyPack(masterPack.id)">
        <span v-if="!isBuyingPack">Buy</span>
        <span v-else>
          <v-progress-circular :size="25" :width="4" color="white" indeterminate></v-progress-circular>
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PackBuyer',
    props: [''],
    data() {
      return {

      }
    },
    created() {
      
    },
    computed: {

    },
    methods: {
      
    }
  }
</script>

<style>
</style>
