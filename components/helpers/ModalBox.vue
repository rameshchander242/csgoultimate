<template>
   <v-layout row justify-center>
    <v-dialog
      v-model="show"
      :persistent="persistent"
      :max-width="maxWidth"
      :dark="theme"
      :fullscreen="fullscreen"
      :hide-overlay="hideOverlay"
     >
     <v-card dark >
        <v-toolbar v-if="toolBar" dark>
          <v-btn icon dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
        <!--   <v-toolbar-items>
            <v-btn dark flat >Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-card-title v-else-if="title!=''" class="headline grey lighten-2">{{title}}</v-card-title>
        <v-card-text>
          <v-container grid-list-md position-relative >
            <site-loader v-if="processing" :lightBackground="true" :autoHeight="true"></site-loader>
            <slot ></slot>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="actions && actions.length > 0">
          <v-spacer></v-spacer>
          <v-btn
            v-for="(action , index) in actions"
            :key="index"
            :class="'darken-1 '+action.style"
            v-on:click="action.callback"
          >
            {{action.title}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    name: 'ModalBox',
    props: {
      processing:{
        type: Boolean,
        default: false
      },
      toolBar: {
        type: Boolean,
        default: false
      },
      theme: {
        type: Boolean,
        default: true
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      persistent: {
        type: Boolean,
        default: true
      },
      hideOverlay: {
        type: Boolean,
        default: false
      },
      maxWidth: {
        type: String,
        default: '400'
      },
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Information'
      },
      actions: { 
        type: [Array, Promise] 
      }
    },
    data () {
      return {}
    },
    methods: {

    }
  }
</script>
