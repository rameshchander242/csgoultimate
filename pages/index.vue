<template>
    <!-- <v-container fluid grid-list-md> -->

    <div id="dashbaord-grid-main">

        <div class="custom-row">

            <div class="dashbox-col-6">
                <router-link :to="{name: 'packs' }">
                  <div class="dash-box-contain dashbox-1 dashbox-1-height">
                    <h2>Browse Packs</h2>

                    <div class="dahboard-box1-inner">
                        <img src="../assets/img/dash-box-label-1.png">
                        1000+ Player cards<br>
                        145 Teams<br>
                        50 COUNTRIES
                        <br>
                        7 different games to play with your ultimate team!
                    </div>

                  </div>
                </router-link>
            </div>


            <div class="dashbox-col-6">
                <div class="dash-box-contain dashbox-2 dashbox-2-height">

                    <div class="dahboard-box2-inner">
                        <div class="dahboard-box2-row">

                            <div class="dahboard-box2-col">
                                <h3>SIGN UP BONUS!</h3>
                                Join CSGOUltimate.gg today and get your one time sign up bonus!
                                <button type="submit" v-on:click="callAccounts()"><img src="../assets/img/sign-in-button.png"></button>
                            </div>


                            <div class="dahboard-box2-col">
                                <img src="../assets/img/dash-signup-label.png">
                            </div>

                        </div>
                    </div>

                </div>




                <div class="dash-box-contain dashbox-2-height image-space">

                    <div class="dahboard-box2-inner">
                        <div class="dahboard-box2-row">

                            <div class="dahboard-box2-col">
                                <h3>FEELING LUCKY?</h3>
                                Legends, Talents, Event winners, Major winners, MVPs, HLTV Top 20.
                                <div class="learn-more">
                                    <router-link to="/about#specialcards">Learn More</router-link>
                                </div>
                            </div>


                            <div class="dahboard-box2-col">
                                <img src="../assets/img/feeling-luck-img.png">
                            </div>

                        </div>
                    </div>

                </div>



            </div>


            <div class="dashbox-col-6">
                <div class="dash-box-contain dashbox-3-height">

                    <div class="dahboard-box2-inner">
                        <div class="dahboard-box2-row">

                            <div class="dahboard-box2-col">
                                <h3>GAME CARDS</h3>
                                6 different BOOSTERS AND GAMEPLAY MODIFIERS
                                <div class="learn-more">
                                    <router-link to="/about#gamecards">Learn More</router-link>
                                </div>
                            </div>


                            <div class="dahboard-box2-col right-side-img">
                                <img src="../assets/img/game-card-img.png">
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div class="dashbox-col-6">
                <div class="dahboard-box3-row">

                    <div class="dahboard-box3-col">
                        <div class="dash-box-contain dashbox-3-height">
                            <div class="dash-box-inner-3">
                                <img src="../assets/img/redeem-code-img.png">
                                <h3>REDEEM CODE</h3>
                                You can find packs, coins or points in redeem codes.
                            </div>

                            <div class="dash-box-newsletter">
                                <input type="text" v-model="code" placeholder="Enter code here...">
                                <button  v-on:click="redeemCoupon" >
                                    <img  v-if="!processing" src="../assets/img/newsletter-button.png">
                                    <span v-else>
                                          <div class="dot-pulse"></div>
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div class="dahboard-box3-col">
                        <div class="dash-box-contain dashbox-4 dashbox-3-height">
                            <div class="dash-box-inner-4">
                                <h3>MANAGER TASKS</h3>
                                Coming soon..
                            </div>

                            <div class="dash-box-rating">
                                <div class="learn-more managertask">
                                    <router-link to="/manager-task">Learn More</router-link>
                                </div>
                                <div class="points-label">
                                    <img src="../assets/img/points-label.png"> 5000
                                </div>

                                <div class="dash-box-ratingbar-main">
                                    <h4>4/13</h4>
                                    <div class="dash-box-ratingbar">
                                        <div class="dashbox-rating-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:13%">
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>



                </div>
            </div>

        </div>
    </div>

    <!-- </v-container> -->
</template>
<script>
    import vuetifyToast from 'vuetify-toast'

    export default {
        name: 'Dashboard',
        components: {

        },
        data() {
            return {
                code: '',
                processing: false
            }
        },
        created() {

        },
        methods: {
            callAccounts () {
                location.href = 'api/auth/steam'
            },
            redeemCoupon() {
                if(this.code) {
                  let payload = { code: this.code }
                    this.processing = true
                    this.$store.dispatch('coupons/redeemCoupon', payload).then((response) => {
                        if(response.status) {
                          // Update balance
                          if(response.data.got == 'packs') {
                            // Got Direct Pack
                            this.$store.dispatch('packs/getMyPacks').then((response) => {}) // update store 
                          } else {
                            // Got Coins | Points Balance
                            this.$store.dispatch('updateBalance', {coinsBalance: response.data.user_info.coinsBalance, pointsBalance: response.data.user_info.pointsBalance })
                          }
                          vuetifyToast.success(response.message) 
                        } else {
                          vuetifyToast.error(response.message)
                        }
                        this.processing = false
                        this.code = ''
                      })
                      .catch((error) => {
                        this.processing = false
                        let message = (error.response.data.data) ? error.response.data.data : response.message
                        vuetifyToast.error(message)
                      })
                } else {
                  vuetifyToast.error('Provide coupon code!')
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
.managertask{
    position: absolute;
    right: 0;
    width: auto;
    z-index: 1;
}
</style>
