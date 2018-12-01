<template>
	<div class="loading_panel" :class="{lightBackground: lightBackground, darkBackground: darkBackground, autoHeight: autoHeight, fullWidth: fullWidth}"><div class="dot-pulse"></div></div>
</template>

<script>
	export default {
	  name: 'DotLoader',
	  props:{
	  	lightBackground: {
        type: Boolean,
        default: false
      },
      darkBackground: {
        type: Boolean,
        default: false
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      fullWidth: {
        type: Boolean,
        default: false
      },
	  },
	  created () {

	  },
	  computed: {
	
	  }
	}
</script>

<style>	
	.loading_panel{ 
		display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    width:100%;
	}
	.loading_panel.lightBackground {
    background: rgba(50,50,50,.5);
    z-index: 99;
	}
	.loading_panel.darkBackground {
    background: rgba(0,0,0,.8);
    z-index: 99;
	}
	.loading_panel.autoHeight {
    min-height: auto;
    position: absolute;
    height: 100%;
    width: 92%;
    margin: -15px 0;
	}
	.loading_panel.fullWidth {
    min-height: auto;
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
	}
</style>
