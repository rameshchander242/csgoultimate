<template>
	<ul class="navigation">
		<li class="nav-item dropdown active_sm_device">
			<a href="#" class="nav-link giveaway">
				<i class="fa fa-gift"></i> <span class="badge badge-pill badge-nav badge-info">1</span> <span class="text-link">Giveaways</span>
			</a>
		</li>
		<li class="nav-item dropdown active_sm_device ">
			<a href="javascript:void(0)" class="nav-link dropdown-toggle noti" role="button"
				 aria-haspopup="true" aria-expanded="false" v-on:click="show_notification=!show_notification">
				<i class="fa fa-bell"></i> <span class="badge badge-pill badge-nav badge-danger" v-if="notifications.notifications.length">{{notifications.notifications.length}}</span> <span class="text-link">Notifications</span>
			</a>
			<div class="notification_list" v-if="show_notification">
				<div class="media-items top_notification" v-if="notifications.notifications[0]">
					<div class="delete_notification text-danger" v-on:click="delete_notification_all()">Delete All</div>
					<transition-group name="list" tag="div">
						<div class="media row" v-for="(item, index) in notifications.notifications" v-if="!item.nDelete" v-bind:key="item.id">
							<div class="media-body col-10 pr-0">
								<div class="media-heading">{{item.description}}</div>
								<span class="text-sm text-muted">{{ item.createdAt.substring(0, 10) }}</span>
							</div>
							<div class="col-2 delete_notification" v-on:click="delete_notification(item)"><i class="fa fa-close text-danger"></i></div>
						</div>
					</transition-group>
				</div>
				<div class="media-items top_notification" v-else>
					No notifications
				</div>
			</div>
		</li>
		<li v-if="$store.state.authUser" class="nav-item inactive_sm_device">
			<a href="#" class="nav-link coinamount" :class="{coinamountloader: balance_loading}"><img class="coin" src="../../assets/img/coinimg.png" /><span id="userPointsDisplay" v-tooltip.top="'Coins'">
					<div  v-if="balance_loading" class="dot-pulse"></div>
						<b class="user-balance" v-else> {{$store.state.authUser.coinsBalance}} </b>	
				</span></a>
		</li>
		<li v-if="$store.state.authUser" class="nav-item inactive_sm_device">
			<a href="#" class="nav-link coinamount" :class="{coinamountloader: balance_loading}"><img class="coin" src="../../assets/img/points.png" /><span id="userPointsDisplay1" v-tooltip.top="'Points'">
					<div  v-if="balance_loading" class="dot-pulse"></div>
						<b class="user-balance" v-else> {{$store.state.authUser.pointsBalance}} </b>	
				</span></a>
		</li>
		<li v-if="$store.state.authUser" class="nav-item dropdown active_sm_device with_avtar">
			<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
				 aria-haspopup="true" aria-expanded="false">
				 <img class="profile-avatar" :src='$store.state.authUser.avatar'>
				 <span class="">
					{{ ($store.state.authUser) ? $store.state.authUser.displayName : 'Username'}} 	
				 </span>
				</a>
			<ul class="dropdown-menu">
				<li>
					<router-link :to="{ name: 'profile' }" class="dropdown-item"><i class="fa fa-user"></i> My Profile</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'manager-task' }" class="dropdown-item"><i class="fa fa-tasks"></i> Manager Task</router-link>
				</li>
				<li>
					<a class="dropdown-item" v-on:click="userInfoUpdate" href="#">
						<i class="fa fa-envelope-o"></i> Set my email
					</a>
				</li>
				<li>
					<a class="dropdown-item" v-on:click="redeemBox" href="#">
						<i class="fa fa-money"></i> Redeem code
					</a>
				</li>
				<li role="separator" class="dropdown-divider"></li>
				<li><a class="dropdown-item" href="/auth/logout"><i class="fa fa-unlock-alt"></i> Log out</a></li>
			</ul>
		</li>
		<li class="nav-item active_sm_device">
			<a v-if="!$store.state.authUser" id='login-steam' class="nav-link pr-0">
				<img  class="loginButton steam-login-btn" v-on:click="callAccounts()" src='../../assets/img/steamLogin.png'>
			</a>
			<a v-else id='login-steam' class="avatar-steam nav-link pr-0">
				<img class="profile-avatar" :src='$store.state.authUser.avatar'>
			</a>
		</li>
	</ul>
</template>

<script>

	export default {
		name: 'TopMenu',
		created () {

		},
		data() {
			return {
				balance_loading: false,
				redeem: false,
				show_notification: false,
			}
		},
		computed: {
			notifications(){
	      return this.$store.getters['userdata/getNotifications']
	    }
		},
		mounted() {
		},
		watch:{
			'$route': function(){
				this.handleNotification()
			}
		},
		methods: {
			handleNotification(){
				this.show_notification=false
			},
			delete_notification(notification){
				console.log(notification)
				let payload = {
					id: notification.id
				}
				this.$store.dispatch('userdata/deleteNotification', payload)
			},
			delete_notification_all(){
				let payload = {
					'notifications': 'all'
				}
				this.$store.dispatch('userdata/deleteNotificationAll', payload)
			},
			redeemBox(){
				// Show
				this.$store.dispatch('coupons/showDialog', true)
			},
			userInfoUpdate(){
				// Show
				this.$store.dispatch('showDialog', true)
			},
			callAccounts () {
				location.href = 'api/auth/steam'
			}
		},
	}
</script>