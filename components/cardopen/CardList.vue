<template>
  <div class="CardList" ref="root">
    <div v-bind:key="index" v-for="(player, index) in playerCards">
      <Card :playerCard="player.playerCard" :isSmall="true"></Card>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'

import Card from './Card.vue'
export default {
  name: 'CardList',
  components: {
    Card,
  },
  props: {
    playerCards: Array
  },
  mounted() {
    var basicTimeline = anime.timeline();
      basicTimeline
      .add({
        targets: this.$refs.root,
        opacity: 1,
        top: '0',
        duration: 1500,
        easing: 'linear',
      }).complete = () => this.$emit('done')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.CardList {
  /* flex-direction: row-reverse; */
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-left: 100px;
  top: -20px;
}
.CardList > div {
  flex: 0 0 auto;
  margin-left: -100px;
}
</style>
