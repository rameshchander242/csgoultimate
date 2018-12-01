<template>
	<v-layout>
		<v-container class="pack-container" fluid grid-list-md>
			<site-loader v-if="layout_loading"></site-loader>
			<MyPacks v-else @packOpened="startPackOpening()" :errorMessage="errorMessage" />
		</v-container>
	</v-layout>
</template>

<script>
import MyPacks from '@/components/packs/MyPacks'
export default {
	middleware: 'auth',
	components: {
		MyPacks
	},
	data(){
		return {
			layout_loading: false,
			errorMessage: '',
		}
	},
	mounted() {
		if (this.$store.getters.isLoggedIn) {
			 this.layout_loading = true
			this.$store.dispatch('packs/getMyPacks').then((response) => {
				if(response.status==false)
					this.errorMessage = (response.message)
					//this.errorMessage = (response.message).replace('{here}', this.$router.replace('/packs'));
				this.layout_loading = false
			}) // update store 
		}
	},
	methods: {
		startPackOpening() {
		this.$router.push({
			path: `/open-card`
		})
	}
	}
}
</script>

<style>
</style>
