<template>
  <div class="transparent-bg-main">
    <div class="marketplace-section-1">
      <h3>{{$props.pageContent.label}}</h3>
      <div><span v-html="$props.pageContent.description"></span></div>
    </div>
    <div class="marketplace-section-2">
      <h2>Open's {{new Date($props.pageContent.comingDate).toDateString('yyyy') }}</h2>
      <h4><Countdown :date="count_timer"></Countdown></h4>
    </div>
    <div class="marketplace-social-main">
      <div class="custom-container">
        <div class="custom-row">
          <div class="marketplace-social-col">
            <h4>Follow us to get notified</h4>
            <a href="#"><img src="../assets/img/twitter.png"></a>
            <a href="#"><img src="../assets/img/steam-logo.png"></a>
            <a href="#"><img src="../assets/img/facebook-icon.png"></a>       
          </div>
          <div class="marketplace-social-col">
            <h4>Claim your free pack</h4>
            <a href="#"><img src="../assets/img/csco-shild-logo.png"></a>
            <a href="#"><img src="../assets/img/steam-signin-logo.png"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from './Countdown.vue'
export default {
  name: 'CountdownPage',
  props: {
    pageContent:{
      type: Object
    }
  },
  components: { Countdown },
  computed: {
    count_timer(){
      return Math.trunc(Date.parse(this.$props.pageContent.comingDate) / 1000);
    }
  }
}
</script>

<style>
</style>
