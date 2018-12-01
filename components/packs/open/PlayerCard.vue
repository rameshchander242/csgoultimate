<template>
  <div ref="root" v-bind:class="{ card: true, goldrare: true, csgo: true, small: isSmall }">
    <div class="player" style="position: relative">
        <img ref="closedpack" :src="this.$store.state.packImage" class="closedpack">
        <img :src="playerCard.backgroundUrl" v-bind:alt="playerCard.cardTypeName" class="player-card" />
        <img ref="clubbadge" v-tooltip.left="playerCard.teamName" :src="playerCard.teamLogo" alt="" class="clubbadge" />
        <div class="avatarholder">
          <img ref="avatar" :src="playerCard.pictureUrl" v-bind:alt="playerCard.playerName" class="avatar" />
        </div>
        <img ref="nationflag" v-tooltip.left="playerCard.countryName"  :src="playerCard.countryLogo" class="nationflag" />
        <div class="ratingholder">
          <span ref="rating" v-tooltip.left="'Over All Score'" class="rating">{{playerCard.overallScore}}</span>
        </div>
        <span v-tooltip.left="playerCard.roleLabel" ref="position" class="position">
          {{playerCard.roleShortName}}
        </span>
        <div class="name">
          <span ref="marquee" class="marquee" v-tooltip.top="'Player Name'">
            {{playerCard.playerName}}
          </span>
        </div>
        <div class="attributes" ref="attributes">
            <span class="rifle" v-tooltip.left="'Rifle Score'">
              {{playerCard.rifleScore}}
            </span>
            <span class="clutch" v-tooltip.left="'Clutch Score'">
              {{playerCard.clutchScore}}
            </span>
            <span class="pistol" v-tooltip.left="'Pistol Score'">
              {{playerCard.pistolScore}}
            </span>
            <span class="awp" v-tooltip.left="'AWP Score'">
              {{playerCard.awpScore}}
            </span>
            <span class="entry" v-tooltip.left="'Entry Score'">
              {{playerCard.entryScore}}
            </span>
            <span class="iq" v-tooltip.left="'IQ Score'">
              {{playerCard.iqScore}}
            </span>
        </div>
        <div class="chemstyle">
          <img v-tooltip.left="playerCard.condition + ' '+ cardConditionValue(playerCard.condition)" class="chemstyleimage" src="../../../assets/img/playericon.png" alt="" style="height: 20px; margin-top: -5px;" /> 
          <span v-tooltip.left="'Special'" class="chemstylename">{{playerCard.mapLabel}}</span>
        </div>
      </div>
  </div>
</template>

<script>

import vuetifyToast from 'vuetify-toast'
import anime from 'animejs'
export default {
  name: "PlayerCard",
  props: {
    playerCard: Object,
    isSmall: {
      type: Boolean,
      default: false
    },
    closed: {
      type: Boolean,
      default: false,
    },
    directShow: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
     var basicTimeline = anime.timeline();

    if(this.directShow) {
       basicTimeline
      .add({
        targets: this.$refs.root,
        opacity: 1,
        top: '0',
        duration: 6,
        easing: 'linear',
      })
      .add({
        targets: this.$refs.closedpack,
        opacity: 0,
        'z-index': 0,
        duration: 1,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.nationflag,
        opacity: 1,
        duration: 1,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.clubbadge,
        opacity: 1,
        duration: 1,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.position,
        opacity: 1,
        duration: 1,
        easing: 'linear'
      })
      .add({
        targets: [this.$refs.avatar, this.$refs.rating, this.$refs.marquee],
        opacity: 1,
        duration: 1,
        easing: 'linear'
      })
      .add({
        targets: this.$refs.attributes,
        opacity: 1,
        duration: 1,
        easing: 'linear'
      });
      basicTimeline.begin = () => this.$emit('start')
      basicTimeline.complete = () => this.$emit('done')

    } else if (this.isSmall == false) {
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

      if(this.$store.skipAnimation == true){
        anime.speed = 5000
      }else{
        anime.speed = 1
      }
      basicTimeline.begin = () => this.$emit('start')
      basicTimeline.complete = () => this.$emit('done');
    } else {
      
      var basicTimeline = anime.timeline();
      basicTimeline
      .add({
        targets: this.$refs.closedpack,
        opacity: 0,
        'z-index': 0,
        duration: 0,
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

</style>
