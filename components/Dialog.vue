<template>
   <v-layout row justify-center>
    <v-dialog
      v-model="dialog_info.show"
      persistent
      max-width="400"
      :dark="true"
    >
      <v-card>
        <v-card-title class="headline white lighten-2">{{dialog_info.title}}</v-card-title>
        <v-card-text>{{dialog_info.content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" v-on:click="login">Login</v-btn>
          <v-btn color="red darken-1" v-on:click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    name: 'Dialog',
    mounted() {
     
    },
    data () {
      return {
        dialog_info: this.$store.getters.infoDialog
      }
    },
    methods: {
      login() {
        location.href = 'api/auth/steam'
      },
      close() {
        this.$store.dispatch('showInfoDialog', {show: false, title: '', content: ''})
      }
    }
  }
</script>