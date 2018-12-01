<template>
  <div ref="root" v-bind:class="{ card: true, goldrare: true, csgo: true, small: isSmall }">
    <div class="player" style="position: relative">
      <img ref="closedpack" v-if="closed == true" src="../../assets/card-open-img/closedpack.png" class="closedpack">
      <img v-bind:src="playerCard.backgroundUrl" v-bind:alt="playerCard.cardType.label" class="player-card" />
      <img ref="clubbadge" v-bind:src="playerCard.player.team.logoUrl" alt="" class="clubbadge" />

      <div class="avatarholder">
        <img ref="avatar" v-bind:src="playerCard.player.pictureUrl" v-bind:alt="playerCard.player.playerName" class="avatar" />
      </div>
      <img ref="nationflag" v-bind:src="playerCard.player.country.imageUrl" class="nationflag" />
      
      <div class="ratingholder">
        <span ref="rating" class="rating">{{playerCard.overallScore}}</span>
      </div>
      <span ref="position" class="position">{{playerCard.role.shortName}}</span>
      
      <div class="name">
        <span ref="marquee" class="marquee">{{playerCard.player.playerName}}</span>
      </div>

      <div class="attributes" ref="attributes">
          <span class="rifle">{{playerCard.rifleScore}}</span> <span class="clutch">{{playerCard.clutchScore}}</span> <span class="pistol">{{playerCard.pistolScore}}</span> <span class="awp">{{playerCard.awpScore}}</span> <span class="entry">{{playerCard.entryScore}}</span>
          <span class="iq">{{playerCard.iqScore}}</span>
      </div>
      <div class="chemstyle">
        <img class="chemstyleimage" src="../../assets/card-open-img/playericon.png" alt="" style="height: 20px; margin-top: -5px;" /> <span class="chemstylename">Hybrid</span>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  name: "Card",
  props: {
    playerCard: Object,
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

.closedpack {
  position: absolute;
  top: -14px;
  left: -3px;
  z-index: 9;
}

</style>
