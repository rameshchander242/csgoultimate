<template>
	<div id="page-sidebar">
		<ul class="nav nav-pills nav-stacked flex-column">
			<li class="nav-item">
				<router-link :to="{ path: '/' }" class="navbar-brand">
					<img src="../../assets/img/logo.png" width="165" />
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ path: '/' }" class="nav-link">
					<i class="fa fa-home"></i> <span class="nav-text">Dashboard</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'packs' }" class="nav-link">
					<i class="fa fa-diamond"></i>
					<span class="nav-text">
						Packs
					</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'my-packs' }" class="nav-link">
					<i class="fa fa-diamond"></i>
					<span class="nav-text">
						My Packs 
						<span 
							v-if="$store.getters['packs/myPackTotal'] > 0" 
							class="badge badge-pill badge-nav badge-danger">
						{{$store.getters['packs/myPackTotal']}}</span>
					</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'my-items' }" class="nav-link">
					<i class="fa fa-archive"></i>
					<span class="nav-text">
						My Items
					</span>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'marketplace' }" class="nav-link">
					<i class="fa fa-clone"></i> <span class="nav-text">Marketplace</span>
				</router-link>
			</li>
			<li v-for="comingMenu in allComingSoon">
				<router-link :to="{ path: comingMenu.slug }" class="nav-link">
					<i :class="'fa '+comingMenu.icon"></i> <span class="nav-text">{{comingMenu.label}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
	  name: 'SideMenu',
	  created () {

	  },
	  computed: {
			allComingSoon(){
				return this.$store.getters['get_AllcomingSoon'];
			}
	  }
	}
</script>

<style>
</style>
