<template>
  <div class="CardList" ref="root">
    <div v-bind:key="index" v-for="(card, index) in otherCards">
      
      <PlayerCard :class="card.cardTypeName"
        v-if="card.indicator == 'players'"
        :playerCard="card"
        :closed="true" 
        :isSmall="true" />
      <CoachCard :class="card.cardTypeName" 
        v-if="card.indicator == 'coaches'"
        :coachCard="card"
        
        :isSmall="true" />
      <FitnessCard :class="card.cardTypeName" 
        v-if="card.indicator == 'fitness'"
        :fitnessCard="card"
        
        :isSmall="true" />
      <ContractCard :class="card.cardTypeName" 
        v-if="card.indicator == 'contract'"
        :contractCard="card"
        
        :isSmall="true" />
      <BoostMapCard :class="card.cardTypeName" 
        v-if="card.indicator == 'boostMapCards'"
        :boostmapCard="card"
        
        :isSmall="true" />
      <BoostRoleCard :class="card.cardTypeName" 
        v-if="card.indicator == 'boostRoleCards'"
        :boostroleCard="card"
        
        :isSmall="true" />
      <SwitchMapCard :class="card.cardTypeName" 
        v-if="card.indicator == 'switchMapCards'"
        :switchmapCard="card"
        
        :isSmall="true" />
      <SwitchRoleCard :class="card.cardTypeName" 
        v-if="card.indicator == 'switchRoleCards'"
        :switchroleCard="card"
        
        :isSmall="true" />
      <TeamBoostCard :class="card.cardTypeName" 
        v-if="card.indicator == 'boostTeamCards'"
        :teamboostCard="card"
        
        :isSmall="true" />
  

  
    </div>
  </div>
</template>

<script>
import anime from 'animejs'

import PlayerCard from './PlayerCard'
import CoachCard from './CoachCard'
import FitnessCard from './FitnessCard'
import ContractCard from './ContractCard'
import BoostMapCard from './BoostMapCard'
import BoostRoleCard from './BoostRoleCard'
import SwitchMapCard from './SwitchMapCard'
import SwitchRoleCard from './SwitchRoleCard'
import TeamBoostCard from './TeamBoostCard'


export default {
  name: 'CardList',
  components: {
    PlayerCard,
    CoachCard,
    FitnessCard,
    ContractCard,
    BoostMapCard,
    BoostRoleCard,
    SwitchMapCard,
    SwitchRoleCard,
    TeamBoostCard,
  },
  props: {
    otherCards: Array,
  },
  mounted() {
    var basicTimeline = anime.timeline();
      //console.log(this.$refs.root.querySelectorAll('>div'));

      basicTimeline
      .add({
        targets: this.$refs.root.querySelectorAll('.CardList > div .card'),
        opacity: 1,
        top: '0',
        delay: function(target, i) {
          return i * 500;
        },
        duration: 1000,
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
.card{
 background-color: #fff0;
}
.card.goldrare.csgo .player {
    display: inline-block;
}
.CardList .small.card {
  opacity: 0;
}

@media (max-width: 1080px){
  .CardList > div{
    margin: 0;
    float: left;
    width: 33%;
  }
}
@media (max-width: 767px){
  .CardList > div{
    width: 50%;
  }
}
@media (max-width: 479px){
  .CardList > div{
    width:100%;
  }
}
</style>
