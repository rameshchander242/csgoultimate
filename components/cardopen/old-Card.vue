<template>
  <!-- <transition name="fade" :duration="1500" v-on:after-enter="afterEnter"> -->
  
    <div ref="root" v-bind:class="{ card: true, goldrare: true, csgo: true, small: isSmall }" v-if="show">
        <div v-if="isSmall" class="player" style="position: relative">
          <img v-bind:src="playerCard.backgroundUrl" v-bind:alt="playerCard.cardType.label" class="player-card" />
          <img v-bind:src="playerCard.player.team.logoUrl" alt="" class="clubbadge" />

          <div class="avatarholder">
            <img v-bind:src="playerCard.player.pictureUrl" alt="" class="avatar" />
          </div>
          <img v-bind:src="playerCard.player.country.imageUrl" class="nationflag" />
          
          <div class="ratingholder">
            <span class="rating">{{playerCard.overallScore}}</span>
          </div>
          <span class="position">{{playerCard.role.shortName}}</span>
          
          <div class="name">
            <span class="marquee">{{playerCard.player.playerName}}</span>
          </div>

          <div class="attributes">
              <span class="rifle">{{playerCard.rifleScore}}</span> <span class="clutch">{{playerCard.clutchScore}}</span> <span class="pistol">{{playerCard.pistolScore}}</span> <span class="awp">{{playerCard.awpScore}}</span> <span class="entry">{{playerCard.entryScore}}</span>
              <span class="iq">{{playerCard.iqScore}}</span>
          </div>
        </div>
        <!-- Animate all -->
        <!-- <div v-else class="player" style="position: relative">
          <transition name="slide-in">
            <img v-if="step >= 1" v-bind:src="playerCard.backgroundUrl" v-bind:alt="playerCard.cardType.label" class="player-card" />
          </transition>
          <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
            <img v-if="step >= 2" v-bind:src="playerCard.player.team.logoUrl" alt="" class="clubbadge" />
          </transition>

          <div class="avatarholder">
            <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
              <img v-if="step >= 4" v-bind:src="playerCard.player.pictureUrl" alt="" class="avatar" />
            </transition>
          </div>
          <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
            <img v-if="step >= 1" v-bind:src="playerCard.player.country.imageUrl" class="nationflag" />
          </transition>

          <div class="ratingholder">
            <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
              <span v-if="step >= 5" class="rating">{{playerCard.overallScore}}</span>
            </transition>
          </div>
          <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
            <span v-if="step >= 3" class="position">{{playerCard.role.shortName}}</span>
          </transition>

          <div class="name">
            <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
              <span v-if="step >= 5" class="marquee">{{playerCard.player.playerName}}</span>
            </transition>
          </div>

          <transition name="fade" :duration="1500" v-on:after-enter="afterEnter">
            <div v-if="step >= 6" class="attributes">
                <span class="rifle">{{playerCard.rifleScore}}</span> <span class="clutch">{{playerCard.clutchScore}}</span> <span class="pistol">{{playerCard.pistolScore}}</span> <span class="awp">{{playerCard.awpScore}}</span> <span class="entry">{{playerCard.entryScore}}</span>
                <span class="iq">{{playerCard.iqScore}}</span>
            </div>
          </transition>
        </div>

        <div class="chemstyle">
          <img class="chemstyleimage" src="../assets/playericon.png" alt="" style="height: 20px; margin-top: -5px;" /> <span class="chemstylename">Hybrid</span>
        </div>
    </div> -->
  <!-- </transition> -->
</template>

<script>
import anime from 'animejs'
export default {
  name: "Card",
  props: {
    show: Boolean,
    playerCard: Object,
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // show: true,
      step: 0
    }
  },
  mounted() {
  anime({
    targets: this.$refs.root,
    translateX: [
      { value: 100, duration: 1200 },
      { value: 0, duration: 800 }
    ],
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 2000,
    loop: true
  });
  },
  methods: {
    // the done callback is optional when
    // used in combination with CSS
    afterEnter: function (el) {
      // ...
      this.step++
      console.log('done')
      if (this.step >= 7) {
        this.$emit('done')
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin: 0 auto;
  /* animation: slideIn 1.5s ease-in; */
}
@keyframes slideIn {
  from {
    transform: translateY(-10%)
  }
  to {
    transform: translateY(0)
  }
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

.slide-in-enter-active {
  transition: all .3s ease;
}
.slide-in-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-in-enter, .slide-in-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
