<template>
	<ComingSoon :pageContent="pageContent" />
</template>
<script>
import ComingSoon from '../../components/ComingSoon.vue'
export default {
  components: { ComingSoon },
  data(){
  	return{
  		pageContent1:{},
  	}
  },
  computed:{
  	pageContent(){
      let slug = this.$route.params.slug;
  		return this.$store.getters['get_comingSoon'](slug);
  	}
  }
}
</script>

<style>
</style>