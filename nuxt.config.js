import colors from 'vuetify/es5/util/colors'
import AgilityClient from "./agility/agility-client"


export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: '%s - Agility CMS + Nuxt',
		title: '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: [],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		"~/plugins/agility-context.js"
	],

	/*
	 ** Router extension
	 */
	router: {
		middleware: 'agility-middleware',
		extendRoutes(routes, resolve) {
			routes.push({
				name: 'custom',
				path: '*',
				component: resolve(__dirname, 'agility/AgilityPage.vue')
			})
		}
	},
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		//'@nuxtjs/eslint-module',
		'@nuxtjs/vuetify'
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios'
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** vuetify module configuration
	 ** https://github.com/nuxt-community/vuetify-module
	 */
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) { }
	},

	generate: {
		fallback: true,
		routes: function () {

			//if we are building this in SPA mode, don't need to get all the routes...
			if (process.argv.includes("--spa")) return [];

			//generate all the routes otherwise...
			const agilityClient = new AgilityClient();
			const api = agilityClient.client;

			return api.getSitemapFlat({
				channelName: agilityClient.config.channelName,
				languageCode: agilityClient.config.languageCode
			}).then((sitemapFlat) => {

				return Object.keys(sitemapFlat).map((path, index) => {
					const retPath = index == 0 ? "/" : path;
					return {
						route: retPath,
						payload: sitemapFlat
					}
				})
			})
		}
	}
}
