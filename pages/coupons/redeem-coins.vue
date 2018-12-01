<template>
<div class="transparent-bg-main">
	<div class="">
			<h3>Redeem Coupon</h3>
			 <v-flex xs6>
	          	<v-card-text class="px-0">
		          	<v-form>
					    <v-text-field
					      v-model="code"
					      label="Provide Cupon Code"
					      required
					    ></v-text-field>
					    <v-btn v-on:click="redeemCoupon" id="redeem-coupon" class="green">submit</v-btn>
					     <v-btn v-on:click="code = ''" class="red">Clear</v-btn>
				  	</v-form>	
          		</v-card-text>
	      </v-flex>
		</div>
	</div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

export default {
  components: {

  },
  data() {
  	return {
  		code:''
  	}
  },
  methods: {
  	redeemCoupon() {
  		if(this.code) {
  			let payload = {
	  			code: this.code,
	  			id: this.$store.state.authUser.id
	  		}
	  		if(payload.id != null){
	  			$('#redeem-coupon').attr("disabled", true)
	    		this.$store.dispatch('redeemCoupon', payload).then((response) => {
	    			console.log('Redeem API response : ', response)
	  				$('#redeem-coupon').attr("disabled", false)
	  				vuetifyToast.success('User Infomration sync successfully.')
		        })
		        .catch((error) => {
	  				$('#redeem-coupon').attr("disabled", false)
		        	vuetifyToast.success(error.response.data.data)
		        })
	    	} else{
  				vuetifyToast.info('User Infomation is not sync correctly!')
  			}	
  		} else {
  			vuetifyToast.info('Code is not specified, try again!')
  		}
  	}
  }
}
</script>

<style>
</style>