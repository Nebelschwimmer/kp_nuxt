import { VTextField } from "vuetify/components";
import { de } from "vuetify/locale";

export default defineNuxtConfig({
	modules: [
		"@nuxt/ui",
		"nuxt-svgo",
		"nuxt-svgo-loader",
		"nuxt-proxy",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxt/eslint",
		"@nuxt/image",
		"@nuxt/icon",
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
		},
	},
	vuetify: {
		vuetifyOptions: {
			defaults: {
				VTextField: {
					variant: "outlined",
					density: "comfortable",
				},
				VSelect: {
					variant: "outlined",
					density: "comfortable",
				}
			},
			theme: {
				defaultTheme: "dark",
				themes: {
					dark: {
						dark: true,
						colors: {
							background: "#000000",
							surface: "#201120",
							primary: "#e82384",
							secondary: "#6A1E55",
							accent:"#FF6363",
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
		vueI18n: "./i18n.config.ts"
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	image: {
		domains: ["kinopoisk.light"],
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
