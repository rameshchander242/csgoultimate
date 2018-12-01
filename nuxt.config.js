module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'CSGO-Ultimate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'steam inside project' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/soundmanager2/2.97a.20150601/script/soundmanager2-jsmin.js' },
      { src: 'https://cdn.jsdelivr.net/npm/canvas-confetti@0.0.2/dist/confetti.browser.min.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", type: 'text/css', href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" },
      { rel: "stylesheet", type: 'text/css', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" },     
      { rel: "stylesheet", type: 'text/css', href: "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700" },     
      { rel: "stylesheet", type: 'text/css', href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" }
    ]
  },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vuetify', 'vue-carousel', '~/assets/js/custom_jquery.js'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      // if (ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    },
    loaders: [
      {
        test: /\.(mp3|wav)$/,
        loader: 'url-loader',
      }
    ]
  },
    /*
  ** Load Vuetify into the app
  */
  plugins: [
      '~/plugins/vuetify',
      { src: '~plugins/vue-carousel', ssr: false },
      { src: '~plugins/vue-alertify', ssr: false },
      { src: '~plugins/v-tooltip', ssr: false },
      { src: '~plugins/vue-lodash', ssr: false },
       { src: '~plugins/DotLoader', ssr: false },
       { src: '~plugins/vue-social-sharing', ssr: false },
       { src: '~plugins/ga.js', ssr: false },
       { src: '~plugins/my-main.js', ssr: false },
    ],
  /*
  ** Load Vuetify CSS globally
  */
  css: ['~/assets/css/app.styl'],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  }
}

