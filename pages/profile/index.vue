<template>
  <v-layout>
    <v-container id="Main_body_for_profile" class="transparent-bg-main profile-container" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex md4 sm5>
          <Profile :profile="profile" :totalReports="userData.userTotals" />
        </v-flex>
        <v-flex md8 sm7>
          <v-tabs v-model="activeTab" color="dark" dark slider-color="#9cac61" grow>
            <v-tab>Coin History</v-tab>
            <v-tab>Point History</v-tab>
            <v-tab-item class="mt-25">
              <CoinsHistory :coinReports="userData.coinsHistory" v-if="userData.coinsHistory" />
              <site-loader v-else></site-loader>
            </v-tab-item>
            <v-tab-item>
              <PointsHistory  :pointReports="userData.pointsHistory" />
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Profile from '~/components/profile/index.vue'
import CoinsHistory from '~/components/profile/CoinsHistory.vue'
import PointsHistory from '~/components/profile/PointsHistory.vue'
export default {
  middleware: 'auth',
  components: {
    Profile,
    CoinsHistory,
    PointsHistory,
  },
  data() {
    return {
      activeTab: 0
    }
  },
  mounted(){
    this.getUserData()
  },
  computed: {
    profile() {
      return this.$store.getters.getUserInfo
    },
    userData(){
      return this.$store.getters['userdata/getUserData']
    }
  }, 
  methods: {
    getUserData(){
      this.panel_loading = true
      this.$store.dispatch('userdata/fetchUserData')
        .then((response) => {
          this.panel_loading = false
        })
        .catch((error) => {
          console.log('Error: ', error)
          this.panel_loading = false
        })
    }
  }

}
</script>
