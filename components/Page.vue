<template>
  <v-layout>
    <div class="transparent-bg-main" id="right-content-scroll" v-if="pageData">
      <h1 class="header_title">{{pageData.pageLabel}}</h1>
      <div class="page_content" v-html="pageData.pageDescription"></div>
    </div>
  </v-layout>
</template>
<script>
  export default{
    data(){
      return{
        pageData: null,
        panel_loading: true,
      }
    },
    props:{
      pageId: Number
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.pageData = this.$store.getters['crudPages/pageData']
      },
    }
  }
</script>

<style>
</style>
