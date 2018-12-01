<template>
	<div>
		<v-container fluid grid-list-md class="pt-0 pb-0">
			<v-layout row wrap>
				<v-flex xs6 sm4 class="pa-0">
					<v-toolbar-side-icon @click.stop="siteDrawer = !siteDrawer" class="sidebar_toggler"></v-toolbar-side-icon>
					<router-link :to="{ path: '/' }" class="navbar-brand">
						<img src="../../assets/img/logo.png" width="165" />
					</router-link>
				</v-flex>
				<v-flex xs6 sm8 class="pa-0 ml-0">
					<v-btn v-on:click="showUserMenu = !showUserMenu" class="menu_toggler" icon>
						<v-icon>more_vert</v-icon>
					</v-btn>
					<TopMenu />
				</v-flex>
				<v-navigation-drawer v-model="siteDrawer" absolute temporary class="mobile_sidemenu">
					<SideMenu />
				</v-navigation-drawer>
				<div class="user-menu" :class="{show_user_menu: showUserMenu}" dark>
					<TopMenu />
				</div>
			</v-layout>
		</v-container>
		<RedeemCoupon />
		<UserInfoUpdate />
	</div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

import RedeemCoupon from '../RedeemCoupon'
import UserInfoUpdate from '../UserInfoUpdate'
import SideMenu from './SideMenu'
import TopMenu from './TopMenu'

export default {
		name: 'Top',
		components: {
			RedeemCoupon,
			UserInfoUpdate,
			SideMenu,
			TopMenu
		},
		mounted(){
			if(this.$store.getters.token){
        this.$store.dispatch('userdata/fetchNotifications').then((response) => { })
      }
			if(this.$store.state.banMessage != ''){
	      //this.$alertify.alert( this.$store.state.banMessage , function(e){});
	      this.$store.state.banMessage = '';
	    }
      this.$store.dispatch('packs/getPackTypes').then((response) => { });
      this.$store.dispatch('getComingSoon');
		},
		data() {
			return {
				siteDrawer: false,
				showUserMenu: false
			}
		},
		methods: { }
	}
</script>

<style>
</style>
