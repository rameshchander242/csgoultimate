<template>
	<v-layout>
		<div id="right-content-scroll">

			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

			<br>
			<br>

			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>
			<br>

			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>
			<br>

			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>
			<br>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>
			<br>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


<br>
			<br>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</div>

	</v-layout>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

export default {
	components: {
	},
	created() {
		this.loadPacks()
	},
	data() {
		return {
			rowsPerPageItems: [4, 8, 12],
					pagination: {
						rowsPerPage: 4
					},
					activeBuy: false,
			pack_qty: 1,
			tabs: null,
			panel_loading: false,
			items: [{
					id: 1,
					title: "PACKS",
					info: []
				},
				{
					id: 2,
					title: "SPROMO PACKS",
					info: []
				},
				{
					id: 3,
					title: "SPECIAL PACKS",
					info: []
				},
				{
					id: 4,
					title: "BUY POINTS",
					info: []
				},
				{
					id: 5,
					title: "MY PACKS",
					info: []
				}
			],
			masterPacks: [],
			nrOfPacks: [1, 2, 3, 4, 5]
		}
	},
	computed: {

	},
	methods: {
		use(pack, type){
			let packs = []
			// Change code to dispatcher
			this.masterPacks.forEach((db_pack)=>{
				if(db_pack.id==pack.id){
					if(type == 'coins') {
						db_pack.use_coin = true
						db_pack.use_point = false
					} else {
						db_pack.use_coin = false
						db_pack.use_point = true
					}
				} 
				// Revision
				// else {
				// 	db_pack.use_coin = false
				// 	db_pack.use_point = false
				// }
				packs.push(db_pack)
			})

			this.masterPacks = packs
		},
		buyPack(pack_info) {
			if (this.$store.state.authUser) {
				let payload = {
					qty: pack_info.pack_qty,
					pack_id: pack_info.id
				}

				if(pack_info.use_coin || pack_info.use_point){
					// Use Balance from
					if (pack_info.use_coin) {
						payload.balance = 'coinsBalance';
					} else {
						payload.balance = 'pointsBalance';
					}

					this.$alertify.confirm("Are you sure to buy this pack?", ()=> {
						let packIndex = this.masterPacks.findIndex(e => e.id == pack_info.id)
						pack_info.cardTypeId = false
						this.masterPacks[packIndex] = pack_info

						this.$store.dispatch('packs/buyPack', payload).then((response) => {
							
							pack_info.cardTypeId = 1

							if(response.status){
								// Update Store 
								let storeUp = (payload.balance == 'coinsBalance') ? {
									coinsBalance: response.data.coinsBalance
								} : {
									pointsBalance: response.data.pointsBalance
								}
								this.$store.dispatch('updateBalance', storeUp);

								vuetifyToast.success(response.message)
								if (this.$store.getters.isLoggedIn) {
									this.$store.dispatch('packs/getMyPacks').then((response) => {}) // update store 
								}
							} else {
								vuetifyToast.error(response.message)
							}
						})
						.catch((error) => {
							vuetifyToast.error(error.response.data.data)
						})
					}, () =>{
						
					})

				} else {
					vuetifyToast.success('Select currency first!')
				}
			} else {
				vuetifyToast.error('Need login first!')
			}
		},
		loadPacks() {
			this.panel_loading = true
			this.$store.dispatch('packs/getMasterPacks').then((response) => {
					if (response.status == true) {
						this.masterPacks = this.$store.getters['packs/getPacks']					
					} else {
						// messages
					}

					this.panel_loading = false
				})
				.catch((error) => {
					this.masterPacks = []
					//  Alert error if need
					this.panel_loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
	.pack-list__item {
		flex: 0 0 30%;
	}
	.p_team_id img {
			width: 25px;
	}
	.v-text-field {
		padding: unset;
	}
</style>
