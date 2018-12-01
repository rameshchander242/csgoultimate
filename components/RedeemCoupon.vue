<template>
	<ModalBox 
	:title="'Redeem your coupon'"
	:processing="processing"
	:show="$store.getters['coupons/dialog']"
	:actions="actions"
	>
		<v-layout wrap>
			<v-flex xs12>
				<v-form v-model="valid">
					<v-text-field
						v-model="code"
						label="Provide Coupon Code"
						:rules="couponRules"
						required
					></v-text-field>
				</v-form>
			</v-flex>
		</v-layout>
	</ModalBox>
</template>

<script>
	import vuetifyToast from 'vuetify-toast'
	import ModalBox from './helpers/ModalBox'

	export default {
		name: 'RedeemCoupon',
		components: {
			ModalBox
		},
		props: {
			 show: {
				type: Boolean,
				default: false
			 }
		},
		mounted() {
			this.$store.dispatch('coupons/showDialog', false)
		},
		data () {
			return {
				valid: false,
				code:'',
				couponRules: [
					v => !!v || 'Coupon code is required'
				],
				processing: false,
				actions: [{
					title: 'Apply',
					style: 'success',
					callback: this.redeemCoupon
				},
				{
					title: 'Cancel',
					style: 'red',
					callback: this.close
				}]
			}
		},
		methods: {
			close() {
				this.$store.dispatch('coupons/showDialog', false)
				this.code = ''
			},
			redeemCoupon() {
				if(this.valid) {
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
								this.$store.dispatch('coupons/showDialog', false)
							} else {
								vuetifyToast.error(response.message)
							}
							this.processing = false
						})
						.catch((error) => {
							this.processing = false
							let message = (error.response.data.data) ? error.response.data.data : response.message
							vuetifyToast.error(message)
						})
				}
			}
		}
	}
</script>