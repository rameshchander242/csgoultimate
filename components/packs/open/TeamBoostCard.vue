<template>

  <div ref="root" v-bind:class="{card: true, goldrare: true, csgo: true, small: isSmall }">
    <div class="player" style="position: relative;">
      <img ref="closedpack" :src="this.$store.state.packImage" class="closedpack">
      <img :src="teamboostCard.backgroundUrl" v-bind:alt="teamboostCard.cardTypeName" class="player-card" />
      <div class='player_details_main boost_team_detail'>
        <div class="name">
          <span ref="marquee" class="marquee" v-tooltip.top="'Team Name'">
            {{teamboostCard.teamName}}
          </span>
        </div>
        <div class="boostpct">
          <div><span v-tooltip.left="'Boost'">{{teamboostCard.boostPct1}}% {{teamboostCard.boostPct1Label}} boost</span></div>
          <div><span v-tooltip.left="'Boost'">{{teamboostCard.boostPct2}}% {{teamboostCard.boostPct2Label}} boost</span></div>
          <div><span v-tooltip.left="'Boost'">{{teamboostCard.boostPct3}}% {{teamboostCard.boostPct3Label}} boost</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  name: "teamboostCard",
  props: {
    teamboostCard: Object,
    isSmall: {
      type: Boolean,
      default: false
    },
    closed: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    if (this.isSmall == false) {
      var basicTimeline = anime.timeline();
      basicTimeline
      .add({
        targets: this.$refs.root,
        opacity: 1,
        top: '0',
        duration: 6000,
        easing: 'linear',
      })
      .add({
        targets: this.$refs.closedpack,
        opacity: 0,
        'z-index': 0,
        duration: 1000,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.nationflag,
        opacity: 1,
        duration: 1500,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.clubbadge,
        opacity: 1,
        duration: 1500,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.position,
        opacity: 1,
        duration: 1500,
        easing: 'linear'
      })
      .add({
        targets: [this.$refs.avatar, this.$refs.rating, this.$refs.marquee],
        opacity: 1,
        duration: 1500,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.attributes,
        opacity: 1,
        duration: 1500,
        easing: 'linear'
      });
      basicTimeline.begin = () => this.$emit('start')
      basicTimeline.complete = () => this.$emit('done')
    } else {
        var basicTimeline = anime.timeline();
        basicTimeline
        .add({
          targets: this.$refs.closedpack,
          opacity: 0,
          'z-index': 0,
          duration: 3000,
          easing: 'linear'
        })
      // basicTimeline.begin = () => this.$emit('start')
      // basicTimeline.complete = () => this.$emit('done')
    }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin: 0 auto;
  opacity: 0;
  top: -50px;
}
.avatar,
.clubbadge,
.position,
.avatar,
.rating,
.marquee,
.attributes,
.nationflag {
  opacity: 0;
}
.small.card {
  opacity: 1;
  top: 0;
}
.small .avatar,
.small .clubbadge,
.small .position,
.small .avatar,
.small .rating,
.small .marquee,
.small .attributes,
.small .nationflag {
  opacity: 1;
}

.small {
  margin: 0 0;
  transform: scale(.7);
  transition: all .2s linear;
}
.small:hover {
  transform: scale(1);
  z-index: 2;
}

.card{
 background-color: #fff0;
}

.card.csgo.goldrare {
  display: block;
  border: 0;
}

.card.csgo .boost_team_detail .name {
    top: 2px;
    position: relative;
}
</style>
