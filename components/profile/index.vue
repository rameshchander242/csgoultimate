<template>
  <div>
    <div class="pr-20">
      <div class="custm_back_for_left_top">
        <div class="sm3 avtar" :style="{ backgroundImage: 'url(' + profile.avatar + ' )' }" >
          <div class="avtar-top"></div>
          <div class="avtar-bottom"></div>
        </div>
        <ul class="left_box_profile">
          <li>
            <span class="top_text_profile"> {{profile.displayName}} </span>
          </li>
          <li>
            <span class="bottom_price_profile">{{profile.customEmail}} </span>
          </li>
        </ul>
      </div>
      <ReferalLink :profile="profile" />
      <div class="custm_back_for_left_top">
        <div class="font-weight-bold">
          STEAM&nbsp; NAME
          <span class="referal_points"><img src="../../assets/img/claim.png" class="claim_icon"> &nbsp; Get 1 pack every 24 hours</span>
        </div>
        <div data-v-4850bf76="" class="ref_link">
          Add CSGOUltimate.gg to your steam name <a :href="profile.profileUrl+'edit'">here</a>
        </div>
      </div>

    </div>
    <div class="pr-20">
      <div v-for="report in totalReports" class="custm_back_for_left_below_profile">
        <div class="sm2 left-img">
          <img :src="getImageUrl(report.image)" :alt="report.label" class="image_size">
        </div>  
        <ul class="left_boxs_below_profile">
          <li>
            <span class="top_text"> {{report.label}} </span>
            
          </li>
          <li>
            <span v-if="report.totalItems" class="bottom_price"> {{report.totalItems}} </span>
            <div v-else class="col-lg-12"><br><div class="dot-pulse"></div></div>
          </li>
        </ul> 
      </div>
    </div>
  </div>
</template>
<script>
import ReferalLink from '@/components/shared/ReferalLink'
export default {
	props: {
		profile: Object,
    totalReports: Array
	},
  components: {  
    ReferalLink,
  },
  methods: {
    getImageUrl(pic){
      return require('~/assets/img/'+pic)
    }
  }
}
</script>

<style>
.social-share{ display: inline-block;}
.ref_link{ word-break: break-all; margin-top:10px; }
.copylink{ fill:#fff; float:right; cursor:pointer; margin-top: -3px; }
.referal_points{ background: #111; padding: 5px; border-radius: 50px; font-size: 12px; margin-left: 5px; }
.referal_points img{ width:18px; margin-top:-5px; }
.referal_points img.claim_icon{ width:12px; }
</style>