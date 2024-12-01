export default defineNuxtConfig({
	modules: [
		'@nuxt/ui',
		'nuxt-svgo',
		'nuxt-svgo-loader',
		'nuxt-proxy',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxt/icon',
		'vuetify-nuxt-module',
	],
	app: {
		pageTransition: {
      name: 'page',
      mode: 'out-in' // default
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
		head: {
      title: 'Kinopoisk Lite',
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
  vuetify:{
    vuetifyOptions: {
      locale:{
        locale: 'ru',
        fallback: 'en',
        messages: {
          ru: require('./i18n/locales/ru-RU'),
          en: require('./i18n/locales/en-US'),
          fr: require('./i18n/locales/fr-FR')
        }
      },
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#673ab7',
              secondary: '#9c27b0',
              accent: '#e91e63',
              error: '#f44336',
              warning: '#ffc107',
              info: '#00bcd4',
              success: '#4caf50'
            }
          },
          dark:{
            colors: {
              primary: '#673ab7',
              secondary: '#9c27b0',
              accent: '#e91e63',
              error: '#f44336',
              warning: '#ffc107',
              info: '#00bcd4',
              success: '#4caf50'
            }
          }
        }
      }
    }
  },
	imports: {
		dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
	},
	i18n: {
		vueI18n: "./i18n.config.ts", // if you are using custom path, default
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	image: {
		domains: ["surland.ru"],
		providers: {
			myProvider: {
				name: "myProvider",
				provider: "~/providers/my-provider.ts",
				options: {
					baseUrl: process.env.BASE_URL,
				},
			},
		},
	},

	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE_URL,
		},
	},

	vite: {
    build: {
      sourcemap: true, // Убедитесь, что это значение true, если карты нужны
    },
		server: {
			proxy: {
				"/api": {
					target:  process.env.API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
				"/uploads": {
					target: `${process.env.BASE_URL}/uploads`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/uploads/, ""),
				},
			},
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: "tab",
				semi: true,
			}, // <---
		},
	},
  

	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
});
