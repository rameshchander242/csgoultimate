<template>
	<v-layout>
		<v-flex>
		<v-tabs
			v-model="active"
			color="dark"
			dark
			slider-color="go-green"
			grow
			show-arrows
			>
			<v-tab
				v-for="tab in tabs"
				:key="tab.id"
				v-on:click="loadData(tab.id)"
				ripple
				>
				{{ tab.label }}
			</v-tab>
		</v-tabs>
		<v-tabs-items 
			touchless
			>
			<v-tab-item
				v-for="tab in tabs"
				:key="tab.id"
				class="mt-10"
				>
				<site-loader v-if="panel_loading"></site-loader>
				<Packs :errorMessage="errorMessage" v-else />
			</v-tab-item>
		</v-tabs-items>
	</v-flex>
</v-layout>
</template>

<script>
	import Packs from '~/components/packs/Packs'
	export default {
		components: {
			Packs
		},
		mounted() {
			this.loadPackTabs()
		},
		data() {
			return {
				active: 0,
				panel_loading: false,
				errorMessage: '',
			}
		},
		computed: {
			tabs() {
				let tabs = this.$store.getters['packs/getPackTabs']
				if(tabs.length > 0){
					this.loadData(tabs[0].id)		
				}
				return tabs
			}
		},
		methods: {
			loadPackTabs() {
			  this.panel_loading = true	
			  this.$store.dispatch('packs/getPackTypes')
	          .then((response) => { })
	          .catch((error) => { this.panel_loading = false })
			},
			loadData(tab_id) { 
				this.panel_loading = true
				this.$store.dispatch('packs/getMasterPacks', tab_id)
					.then((response) => { 
						if(response.status==false)
							this.errorMessage = response.message;
						this.panel_loading = false }
					)
					.catch((error) => { this.panel_loading = false })
			}
		}
	}
</script>

<style>	
</style>
