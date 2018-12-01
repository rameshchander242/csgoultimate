<template>
	<v-layout>
		<div class="transparent-bg-main" id="right-content-scroll">
			<h1 class="header_title">{{$props.title}}</h1>

			This is Manager Task Page.


		</div>
	</v-layout>
</template>
<script>
	export default{
	  name: 'ManagerTask',
	  props: {
	    title: {
	      type: String,
	      default: 'Manager Task'
	    }
	  },
	}
</script>