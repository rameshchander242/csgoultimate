<template>
  <ModalBox 
  :title="'Update Custom Email ID'"
  :processing="processing"
  :show="$store.getters.dialog"
  :actions="actions"
  >
    <v-layout wrap>
      <v-flex xs12>
        <v-form v-model="valid">
          <v-text-field
            v-model="custom_email"
            label="Provide Custom Email ID"
            :rules="emailRules"
            required
          ></v-text-field>
      </v-form>
      </v-flex>
    </v-layout>
  </ModalBox>
</template>

<script>
  import vuetifyToast from 'vuetify-toast'
  import ModalBox from './helpers/ModalBox'

  export default {
    name: 'UserInfoUpdate',
    components: {
      ModalBox
    },
    props: {
       show: {
        type: Boolean,
        default: false
       }
    },
    mounted() {
      // this.custom_email = 
      this.$store.dispatch('showDialog', false)
    },
    data () {
      return {
        valid: false,
        processing: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        actions: [{
          title: 'Update',
          style: 'success',
          callback: this.updateUser
        },
        {
          title: 'Cancel',
          style: 'red',
          callback: this.close
        }]
      }
    },
    computed:{
      custom_email: {
        get: function(){
          return (this.$store.getters.token) ? this.$store.state.authUser.customEmail : ''
        },
        set: function(newEmailId){
          this.email = newEmailId
        }
      }
    },
    methods: {
      close() {
        this.$store.dispatch('showDialog', false)
      },
      updateUser() {
        if(this.valid){
          if(this.email) {
            let payload = { email: this.email }
            this.processing = true
            this.$store.dispatch('updateUserInfo', payload).then((response) => {
                if(response.status) {
                  vuetifyToast.success(response.message)
                  this.$store.dispatch('userUpdate').then((response) => {})
                  this.$store.dispatch('showDialog', false) 
                } else {
                  vuetifyToast.error(response.message)
                }
                this.processing = false
              })
              .catch((error) => {
                this.processing = false
                let message = (error.response.data.data) ? error.response.data.data : response.message
                vuetifyToast.error(message)
              })
          } else {
            vuetifyToast.error('No new data!')
          }
        }
      }
    }
  }
</script>