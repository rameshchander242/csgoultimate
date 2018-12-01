<template>
	<div>
  <ModalBox 
  class="tos_modal  "
  title="Term of Service"
  :processing="processing"
  :show="show"
  :maxWidth= "'600'"
  :full-width= "'true'"
  :actions="actions"
  >
    <v-layout wrap class="tos_popup">
      <v-flex xs12 >
       <!--  I am 13+ or older and i accept the <router-link :to="{ name: 'term-of-service' }">Terms of Service</router-link>   -->
        <span v-html="pageData.pageDescription"></span>
      </v-flex>
    </v-layout>
  </ModalBox>

</div>
</template>

<script>
  import vuetifyToast from 'vuetify-toast'
  import ModalBox from '~/components/helpers/ModalBox'

  export default {
    name: 'TOS',
    components: {
      ModalBox
    },
    data () {
      return {
      	 // show: false,
        pageData: '',
        valid: false,
        processing: false,
        actions: [{
          title: 'Accept',  
          style: 'success',
          callback: this.acceptTOS
        },
        {
          title: 'Decline',
          style: 'red',
          callback: this.declineTOS
        }],
      }
    },
    computed:{
    	profile() {
	      return this.$store.state.authUser
	    },


	    show: {
	    	get(){
		    	if(this.$store.state.authUser){
		    		if(typeof(this.$store.state.authUser.tos) != undefined ){
		    			if(this.$store.state.authUser.tos !== true ){
                this.fetchPage()
		    				return true
		    			}else{
		    				return false
		    			}
		    		}
		    	}else{
		    		this.valid = true
		    		return false
		    	}
		    },
		    set(value){
		    	this.valid = value
		    }
	    }

    },
    methods: {
        declineTOS() {
          window.location.href='/auth/logout'
        },
      async fetchPage() {
	      this.processing = true
	      this.$store.dispatch('crudPages/getPage', 3)
	        .then((response) => {
	          this.processing = false
	          this.pageData = this.$store.getters['crudPages/pageData']
	          return true;
	        })
	        .catch((error) => {
	          vuetifyToast.error('Page Not Found')
	          this.processing = false
	        })
	    },
      acceptTOS() {
      	console.log(this.$store.state.authUser);
      	this.$store.dispatch('acceptTOS')
	        .then((response) => {
	        	if(response.status == true){
              this.$store.state.authUser.tos = true
		          this.processing = false
		          this.show = false
	        	}
	        })
	        .catch((error) => {
	          vuetifyToast.error('Page Not Found')
	          this.processing = false
	        })

      }
    }
  }
</script>
<style scope>
.tos_popup{ max-height:240px; overflow: auto; }
</style>