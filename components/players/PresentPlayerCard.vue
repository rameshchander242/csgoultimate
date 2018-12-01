<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <div class="text-center">
          <div v-if="selectedPlayer != null">
            <player-card :selectedPlayer="selectedPlayer"></player-card>            
          </div>
          <div v-else>
            <v-progress-circular :size="25" :width="4" color="white" indeterminate></v-progress-circular>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import PlayerCard from './PlayerCard';

  export default {
    name: 'PresentPlayerCard',
    components: {
      PlayerCard
    },
    created() {
      this.$store.dispatch('LOAD_PLAYER_CARD', this.$route.params.id);
    },
    computed: {
      selectedPlayer() {
        let getPlayerCard = this.$store.getters.GET_PLAYER_CARD;
        let selectedPlayer = [];
        return selectedPlayer = getPlayerCard;
      }
    }
  }
</script>
