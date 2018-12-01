<template>
  <div>
    <div>
      <v-tabs slot="extension"
              v-model="tab"
              color="dark"
              grow>
        <v-tabs-slider color="go-green"></v-tabs-slider>
        <v-tab>
          PACKS
        </v-tab>
        <v-tab>
          PROMO PACKS
        </v-tab>
        <v-tab>
          SPECIAL PACKS
        </v-tab>
        <v-tab>
          BUY POINTS
        </v-tab>
        <v-tab>
          MY PACKS <span class="badge badge-pill badge-nav badge-danger" style="margin-left: 5px">{{packs.length}}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="pack-list">
            <div class="pack-list__item dark" v-for="(masterPack, i) in masterPacks" :key="i">
              <div class="pack-card">
                <img src="../../assets/img/card_template.png" />
              </div>
              <div class="pack-prices">
                <div class="pack-prices__item coins text-right selected">
                  <img src="../../assets/img/coin30.png" />
                  <span>{{ masterPack.price }}</span>
                </div>
                <div class="pack-prices__item points text-left">
                  <span>275</span>
                  <img src="../../assets/img/points.png" />
                </div>
              </div>
              <div class="pack-amount mt-3">
                <div class="pack-amount__text text-right">AMOUNT</div>
                <div class="pack-amount__selector">
                  <v-select :items="nrOfPacks" content-class="select-pack-count" hide-details v-model="masterPack.nrToBuy"></v-select>
                </div>
                <div class="pack-amount__button">
                  <v-btn small class="btn-success ma-0" @click="buyPack(masterPack)">
                    Buy now
                  </v-btn>
                </div>
              </div>
              <div class="pack-info mt-3 mb-3">
                <div class="pack-info__detail">
                  <span class="detail-number">{{ masterPack.minimumPlayerAmount }}</span>
                  <span class="detail-text"><span v-if="masterPack.minimumPlayerAmount.length > 1">PLAYERS</span><span v-else>PLAYER</span></span>
                </div>
                <div class="pack-info__detail">
                  <span class="detail-number">{{ masterPack.minimumGoldAmount }}</span>
                  <span class="detail-text">GOLD</span>
                </div>
                <div class="pack-info__detail">
                  <span class="detail-number">{{ masterPack.cardAmount }}</span>
                  <span class="detail-text">ITEMS</span>
                </div>
              </div>
              <div class="pack-small-text mb-2">
                <span>MIN. GUARANTEES</span>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
        </v-tab-item>
        <v-tab-item>
        </v-tab-item>
        <v-tab-item>
        </v-tab-item>
        <v-tab-item>
          <my-packs @packOpened="startPackOpening()"></my-packs>
        </v-tab-item>
      </v-tabs-items>
      <pack-opening ref="packopening"></pack-opening>
    </div>
  </div>
</template>

<script>
  import MyPacks from './MyPacks';
  import PackOpening from './PackOpening';

  export default {
    name: 'PackBuyer',
    components: {
      MyPacks,
      PackOpening
    },
    data() {
      return {
        isBuyingPack: false,
        tab: null,
        tabHeaders: [
          'PACKS', 'PROMO PACKS', 'SPECIAL PACKS', 'BUY POINTS', 'MY PACKS'
        ],
        nrOfPacks: [1, 2, 3, 4, 5],
        dialog: false
      }
    },
    created() {
      this.$store.dispatch('LOAD_MASTER_PACKS');
    },
    computed: {
      masterPacks() {
        let getMasterPacks = this.$store.getters.GET_MASTER_PACKS;
        let masterPacks = [];
        masterPacks = getMasterPacks;

        masterPacks.forEach((pack) => {
          pack["nrToBuy"] = 1;
        });

        return masterPacks = getMasterPacks;
      },
      packs() {
        let getPacks = this.$store.getters.GET_PACKS;
        let packs = [];
        return packs = getPacks;
      }
    },
    methods: {
      buyPack(masterPack) {
        this.$store.dispatch('BUY_PACK', masterPack).then(() => {

          this.$store.commit('ADD_ALERT', {
            "message": `Purchased ${masterPack.nrToBuy} pack(s)`,
            "type": "success"
          });

          // Reset to 1
          //let mPack = this.masterPacks.find(e => e.id == masterPack.id);
          //mPack.nrToBuy = 1;

          this.$store.dispatch('LOAD_PACKS');
        });
      },

      startPackOpening() {
        this.$refs.packopening.showOpenedItems();
      }
    }
  }
</script>

<style>
</style>
