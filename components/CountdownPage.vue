<template>
	<div class="transparent-bg-main">
		<div class="marketplace-section-1">
			<h3>{{$props.title}}</h3>
			<p>You will be able to list any items here for any price. We support auctions and regular fixed priced sales. Marketplace listing have a maximum
				duation of 24 hours, if item is not sold it will be returned to owner. By using the marketplace you will support the counter-strike players.
				When buying or selling an item on this market, a fee percentage is paid out directly to the CS:GO Pro player.
			</p>
		</div>
		<div class="marketplace-section-2">
			<h2>Open's {{up_date}} </h2>
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
    title: {
      type: String,
      default: 'Marketplace'
    },
    up_date: {
      type: String,
      default: 'August 30, 2030'
    }
  },
  components: { Countdown },
  mounted () {
    this.initCountdown()
  },
  data () {
    return {
      count_timer: 0
    }
  },
  methods: {
    initCountdown () {
      this.count_timer = Math.trunc(Date.parse(this.$props.up_date) / 1000)
    }
  }
}
</script>

<style>
</style>
