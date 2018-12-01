import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

// Custom filter here - place this is for testing
Vue.filter('two_digits', function (value) {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
})
