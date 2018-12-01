<template>
	<v-snackbar v-model="snackbar"
							:color="type"
							:timeout="timeout"
							top
							right>
		{{ message }}
		<v-btn flat
					 @click="removeAlert">
			Close
		</v-btn>
	</v-snackbar>
</template>

<script>
	export default {
	  name: 'Alert',
	  props: ['type', 'index', 'message'],
	  data () {
	    return {
	      snackbar: true,
	      timeout: 2500
	    }
	  },
	  created () {
	    setTimeout(() => {
	      this.removeAlert()
	    }, 2510)
	  },
	  methods: {
	    removeAlert () {
	      this.$store.commit('REMOVE_ALERT', this.index)
	    }
	  }
	}
</script>

<style>
	.v-snack__wrapper.success {
		background-color: #449d44;
		border-color: #419641;
	}

	.v-snack__wrapper.info {
		background-color: #2196f3 !important;
		border-color: #2196f3 !important;
	}

	.v-snack__wrapper.error {
		
	}

</style>
