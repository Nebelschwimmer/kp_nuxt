export default defineNuxtConfig({
	modules: [
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxt/eslint",
		"@nuxt/image",
		"vuetify-nuxt-module",
	],
	app: {
		pageTransition: {
			name: "page",
			mode: "out-in", // default
		},
		layoutTransition: { name: "layout", mode: "out-in" },
		head: {
			title: "Kinopoisk Lite",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Kinopoisk Lite",
				},
				{
					hid: "og:title",
					name: "og:title",
					content: "Kinopoisk Lite",
				},
				{
					hid: "og:description",
					name: "og:description",
					content: "Kinopoisk Lite",
				},
				{},
			],
		},
	},
	vuetify: {
		vuetifyOptions: {
			labComponents: true,
			defaults: {
				VTextField: {
					variant: "outlined",
					density: "comfortable",
				},
				VSelect: {
					variant: "outlined",
					density: "comfortable",
				},
			},
			theme: {
				defaultTheme: "light",
				themes: {
					light: {
						colors: {
							background: "#ffffff",
							surface: "#e4e4e4",
							primary: "#607262",
							secondary: "#e0974a",
							accent: "#ed7b49",
							error: "#f44336",
							info: "#FFBD69",
							success: "#4caf50",
							warning: "#fb8c00",
						},
					},
				},
			},
		},
	},
	imports: {
		dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
	},
	i18n: {
		vueI18n: "./i18n.config.ts",
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
			sourcemap: true,
		},
		server: {
			proxy: {
				"/api": {
					target: process.env.API_BASE_URL,
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
