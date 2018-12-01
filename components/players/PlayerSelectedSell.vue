<template>
  <v-layout class="mt-3">
   <v-container class="pack-container" fluid grid-list-md>
   	<div class="grayBlock text-xs-center">
   		<ul class="p_detials_list">
   		<li><b>Selected Players</b> <span class="detail-action">{{quickSell.length}}</span></li>
   		<li><b>Quick Sell</b> <span class="detail-action q_s_value"><button v-on:click="sell(quickSell, 'quick')"><img src="../../assets/img/coinimg.png" alt="coin">{{sum}}</button></span></li>
   		</ul>
   	</div>
  </v-container>
</v-layout>
</template>
<script>
	export default{
		props:{
			quickSell:Array,
			quickSellPrice:Array,
    	sellSelectedPlayer: Function
		},
		computed:{
			sum(){
	    	var b = 0;
	    	this.quickSellPrice.forEach(function(val){
	    		b += parseInt(val);
	    	});
	    	return b;
	    }
		},
		data(){
			return {
				totalSell:0
			}
		},
		methods: {
	    sell(player, type){
	      this.$props.sellSelectedPlayer(player, type)
	    },
	    
   }
	}
</script>