<template>
	<site-loader v-if="panel_loading"></site-loader>
	<Page v-else :pageId="pageId" />
</template>

<script>
import vuetifyToast from 'vuetify-toast'
import Page from '../../components/Page.vue'
export default {
  components: { Page },
  data(){
  	return{
  		panel_loading: false,
      pageId: 3
  	}
  },
  mounted(){
    this.fetchPage()
  },
  methods: {
    fetchPage() {
      this.panel_loading = true
      this.$store.dispatch('crudPages/getPage', this.pageId)
        .then((response) => {
          this.panel_loading = false
        })
        .catch((error) => {
          vuetifyToast.error('Page Not Found')
          this.panel_loading = false
        })
    },
  }

}
</script>

<style>
</style>