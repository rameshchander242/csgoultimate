<template>
  <div class="card csgoultimate goldrare" id="card">
    <div class="player" style="position: relative">
      <img :src="selectedExtra.backgroundUrl" class="player-card" id="background">
      <img :src="selectedExtra.coach.team.logoUrl" class="clubbadge" id="teamImage">
      <div class="avatarholder">
        <img :src="selectedExtra.coach.pictureUrl" class="playerImage" id="playerImage">
      </div>
      <img :src="selectedExtra.coach.country.imageUrl" class="nationflag" id="countryImage">
      <div class="ratingholder">
        <span class="rating" id="overallRating">{{selectedExtra.overallScore}}</span>
      </div>
      <div class=" name">
        <span class="marquee" id="playerName">{{selectedExtra.coach.coachName}}</span>
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
    name: 'ExtraCard',
    props: ['selectedExtra'],
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
