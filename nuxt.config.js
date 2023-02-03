export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CV-AKU - Membuat CV dan Web dalam satu aplikasi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@tabler/core/dist/css/tabler.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/node_modules/@tabler/core/dist/js/tabler.min.js',
    '~/plugins/route.js',
    '~/plugins/bootstrap.js',
    '~/plugins/vue-swal.js',
    '~/plugins/vue-toggle.js',
    '~/plugins/readmore.js',
    '~/plugins/repositories.js',
    '~/plugins/qr.js',
    '~/plugins/vue-clipboard.js',
    '~/plugins/vue-multiselect.js',
    '~/plugins/vue-draggable.js',
    { src: '~/plugins/vue-fullcalendar', ssr: false },
    { src: '~/plugins/jquery', ssr: false },
    '~/plugins/vue-excel.js',
    '~/plugins/vue-dropzone.js',
    '~/plugins/vue-cropper.js',
    '~/plugins/vue-youtube-embed.js',
    '~/plugins/vue-datepicker.js',
    '~/plugins/vuejs-countdown-timer.js',
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '@/plugins/vue-html2pdf', mode: 'client' },
    '~/plugins/label.js' 
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    "@nuxtjs/dotenv",
    '@nuxtjs/toast',
  ],

  bootstrapVue: {
    bootstrapCSS: true, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: true,
  },  

  router: {
    middleware: ['auth']
  },

  loading: {
    color: "#DA2C16"
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.LARAVEL_ENDPOINT
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  auth:{
    redirect: {
        login:'/login',
        logout:'/',
        callback: '/auth/callback',
        user:'/'
    },
    strategies: {
        'laravelJWT': {
            provider: 'laravel/jwt',
            url: process.env.LARAVEL_ENDPOINT,
            endpoints: {
                login: { url: '/login', method: 'post'},
                refresh: { url: '/auth/refresh', method: 'post' },
                user: { url: '/auth/me', method: 'get' },
                logout: { url: '/logout', method: 'post' },
                userInfo: { url: '/auth/me', method: 'get' },
            },
            token: {
              property: 'access_token',
              maxAge: 60 * 600
            },
            refreshToken: {
              maxAge: 20160 * 600
            },
        },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
