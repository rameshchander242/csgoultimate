<template>
  <div class="custm_back_for_left_top">
    <div class="font-weight-bold">REFERAL&nbsp; LINK 
      <span class="referal_points"><img class="coin" src="../../assets/img/points.png" /> 200</span>
      <span class="copylink" @click="copyRefLink()">
        <v-tooltip top>
          <svg slot="activator" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          <span>{{Copy_Content}}</span>
        </v-tooltip>
      
    

    </span></div>

    <div class="ref_link">
      {{ref_link}}
      <input type="hidden" :value="ref_link" id="reflink">
    </div>
    <div class="d-none">
      <br>
      Share With: &nbsp; 
      <social-sharing  :url="ref_link"
                  v-cloak inline-template>
        <div class="social-share">
          <network network="facebook">
            <i class="fa fa-fw fa-facebook"></i>
          </network>
          <network network="googleplus">
            <i class="fa fa-fw fa-google-plus"></i>
          </network>
          <network network="linkedin">
            <i class="fa fa-fw fa-linkedin"></i>
          </network>
          <network network="pinterest">
            <i class="fa fa-fw fa-pinterest"></i>
          </network>
          <network network="twitter">
            <i class="fa fa-fw fa-twitter"></i>
          </network>
        </div>
      </social-sharing>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		profile: Object,
	},
  data(){
    return{
      ref_link:'',
      show: false,
      Copy_Content: 'Copy'
    }
  },
  mounted(){
    this.ref_link = window.location.origin+'/api/ref/'+this.profile.referalCode
  },
  methods:{
    copyRefLink () {
      let reflinkToCopy = document.querySelector('#reflink')
      reflinkToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
      reflinkToCopy.select()
      document.execCommand('copy');
      reflinkToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
      this.Copy_Content = 'Referal Link copied'
      let self = this;
      setTimeout(function(){ self.Copy_Content = 'Copy' }, 3000);
    },
  }
}
</script>