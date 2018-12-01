<template>
  <div class="card csgoultimate goldrare" id="card">
    <div class="player" style="position: relative">
      <img :src="selectedCoach.backgroundUrl" class="player-card" id="background">
      <img :src="selectedCoach.coach.team.logoUrl" class="clubbadge" id="teamImage">
      <div class="avatarholder">
        <img :src="selectedCoach.coach.pictureUrl" class="playerImage" id="playerImage">
      </div>
      <img :src="selectedCoach.coach  .country.imageUrl" class="nationflag" id="countryImage">
      <div class="ratingholder">
        <span class="rating" id="overallRating">{{selectedCoach.overallScore}}</span>
      </div>
      <div class=" name">
        <span class="marquee" id="playerName">{{selectedCoach.coach.coachName}}</span>
      </div>
    </div>
    <div class="chemstyle">
      <img class="chemstyleimage" src="http://cdn.csgoultimate.gg/images/csgoultimateimage-1501509996996.png" alt="" style="height: 20px; margin-top: -5px;">
      <span class="chemstylename" id="map"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoachCard',
    props: ['selectedCoach'],
    data: () => ({

    }),
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
