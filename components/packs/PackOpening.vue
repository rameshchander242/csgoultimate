<template>
  <v-dialog class="pack-opening" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card tile>
      <v-toolbar card dark color="dark" v-if="!found">
        <v-btn icon dark v-on:click="goBack" @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="pack-load" ref="root">
        <!-- {{openedPack}} -->

          <button v-on:click="startCelibration">Start</button>

          <CardBackground v-if="dataLoad" @done="onBGLoad">
             <template slot="legend">
              <Card v-if="show" :closed="true" @start="onLoadStart" @done="onLegendLoad" v-bind:playerCard="goldPlayer.playerCard"></Card>
            </template>
            <template slot="bottom">
              <CardList v-if="showBottom" @done="bottomLoad" v-bind:playerCards="otherPlayers"></CardList>
            </template> 
          </CardBackground>
           <v-layout v-if="found">
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                    <v-card-title
                      class="headline grey lighten-1"
                      primary-title
                    >
                      No Pack Ready for Open
                    </v-card-title>

                    <v-card-text>
                      Please cross check the My Pack and try again!
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-on:click="goBack" color="primary" flat>
                      Back
                    </v-btn>
                  </v-card-actions>
            </v-card>
            </v-flex>
          </v-layout>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
// import {soundManager} from 'soundmanager2'
import PlayerCard from '@/components/players/PlayerCard'
import CardBackground from './open/CardBackground'
import Card from './open/Card'
import CardList from './open/CardList'

// const soundUrl = require('~/assets/open.wav')

export default {
    name: 'PackOpening',
    components: {
      PlayerCard,
      CardBackground,
      Card,
      CardList
    },
    data () {
      return {
        dialog: false,
        found: false,
        show: false,
        showBottom: false,
        dataLoad: false,
        goldPlayer: {},
        otherPlayers: []
      }
    },
    destroyed: function() {
      console.log('pack open destroyed')
    },
    mounted () {
      setTimeout( ()=>{
        this.loadCardOpening() 
      }, 500)
    },
    computed: {
      openedPack() {
        let getPack = this.$store.getters['packs/getOpenedPack']
        console.log(getPack)
        return getPack
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      showOpenedItems () {
        this.dialog = true
      },
      onBGLoad () {
        this.show = true
      },
      onLoadStart () {
        console.log("start");
        window.mySoundObject.play();

        // this.startCelibration()
        // this.$refs.music.play();
      },
      startCelibration() {
          var end = Date.now() + (10 * 1000);

          var interval = setInterval(function() {
              if (Date.now() > end) {
                  return clearInterval(interval);
              }

              confetti({
                  startVelocity: 30,
                  spread: 360,
                  ticks: 60,
                  origin: {
                      x: Math.random(),
                      // since they fall down, start a bit higher than random
                      y: Math.random() - 0.2
                  }
              });
          }, 200);
      },
      loadCardOpening() {
            let packdata = this.openedPack
            // sort players
            if(packdata.userPlayerCards) {
              console.log(process.cwd())
              soundManager.onready(() => {
                window.mySoundObject = soundManager.createSound({
                  url:  'http://46.101.248.211/open.wav', // music path http://www.noiseaddicts.com/samples_1w72b820/3828.mp3
                  volume: 100,
                  // autoLoad: true,
                  autoPlay: false,
                  multiShot: false,
                  multiShotEvents: false,
                  whileloading: function() { console.log('loading'); },
                  // onload: () => this.loadData
                });
                //window.mySoundObject.start()
                // window.mySoundObject.load({
                //   volume: 0,
                //   onfinish: () => this.loadData(),
                // });
                // window.mySoundObject.start();

                
                // this.loadData();
              });

              packdata.userPlayerCards.sort(function(a, b){
                return b.playerCard.overallScore - a.playerCard.overallScore;
              })

              this.goldPlayer = packdata.userPlayerCards[0]
              this.otherPlayers = packdata.userPlayerCards;
              this.otherPlayers.shift()

              // window.mySoundObject.play();
              // window.mySoundObject.play({volume:100});
              this.dataLoad = true
              // window.mySoundObject.play({volume:100});
            } else {
              this.found = true
            }         
          
      },
      onLegendLoad () {
        console.log("legend done")
        this.showBottom = true
      },
      bottomLoad () {
        console.log("bottom load")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-dialog__content {
      z-index: 9999 !important;
  }
  .pack-load {
    height: calc(100vh - 64px);
    margin: auto;
  }
</style>
