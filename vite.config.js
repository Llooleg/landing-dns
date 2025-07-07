import legacyPlugin from '@vitejs/plugin-legacy';
import pugPlugin from '@vituum/vite-plugin-pug';
import postcssAutoprefixer from 'autoprefixer';
import postcssMergeLonghand from 'postcss-merge-longhand';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import { URL, fileURLToPath } from 'url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteImageOptimizer as imageOptimizerPlugin } from 'vite-plugin-image-optimizer';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';
import vituumPlugin from 'vituum';

const htmlPlugin = () => {
	return {
		name: 'html-transform',
		transformIndexHtml(html) {
			return html.replaceAll(
				/(?:^|[^а-яёА-ЯЁ0-9_])(в|без|а|до|из|к|я|на|по|о|от|перед|при|через|с|у|за|над|об|под|про|для|и|или|со|около|между)(?:^|[^а-яёА-ЯЁ0-9_])/g,
				(match) => {
					return match.slice(-1) === ' ' ? `${match.substr(0, match.length - 1)}&nbsp;` : match;
				},
			);
		},
	};
};

export default defineConfig(({ mode }) => {
	return {
		appType: 'mpa',

		base: './',

		build: {
			assetsInlineLimit: 0,
			outDir: 'build',
			rollupOptions: {
				output: {
					assetFileNames: ({ name }) => {
						if (/\.(jpe?g|png|gif|tiff|webp|svg|avif)$/.test(name ?? '')) {
							return 'assets/images/[name]-[hash][extname]';
						}

						if (/\.css$/.test(name ?? '')) {
							return 'assets/styles/[name]-[hash][extname]';
						}

						if (/\.(woff2?|ttf|otf|eot)$/.test(name ?? '')) {
							return 'assets/fonts/[name]-[hash][extname]';
						}

						if (/\.(mp3|ogg|wav|mp4|ogv|webm)$/.test(name ?? '')) {
							return 'assets/videos/[name]-[hash][extname]';
						}

						return 'assets/[name]-[hash][extname]';
					},
					chunkFileNames: 'assets/scripts/[name]-[hash].js',
					entryFileNames: 'assets/scripts/[name]-[hash].js',
					manualChunks: (id) => {
						if (id.includes('vendor.scss')) return 'vendor';
						if (id.includes('font.scss')) return 'font';
						return null;
					},
				},
			},
		},

		css: {
			postcss: {
				plugins: [
					postcssSortMediaQueries({
						sort: 'desktop-first',
					}),
					...(mode === 'production'
						? [postcssPresetEnv(), postcssMergeLonghand(), postcssAutoprefixer({ cascade: true, grid: 'autoplace' })]
						: []),
				],
			},
		},

		plugins: [
			vituumPlugin({
				imports: {
					filenamePattern: { '+.css': [], '+.js': 'src/assets/scripts', '+.scss': 'src/assets/styles/' },
				},
				input: ['./src/views/pages/**/*.pug'],
				pages: {
					dir: './src/views/pages/',
					normalizeBasePath: true,
				},
			}),
			pugPlugin({
				data: './src/views/data/**/*.json',
				root: './src/',
			}),
			createSvgSpritePlugin({
				svgFolder: './src/assets/images/icons/',
				svgSpriteConfig: {
					shape: {
						transform: [
							{
								svgo: {
									plugins: [
										'preset-default',
										{
											name: 'removeAttrs',
											active: true,
											params: {
												attrs: '(fill|fill-opacity|fill-rule|stroke|stroke-width|stroke-linecap|stroke-linejoin|stroke-opacity|opacity|clip-rule)',
											},
										},
										{
											name: 'removeDimensions',
											active: true,
										},
										{
											name: 'removeViewBox',
											active: false,
										},
										{
											name: 'inlineStyles',
											active: true,
											params: {
												onlyMatchedOnce: false,
											},
										},
									],
								},
							},
						],
					},
				},
				transformIndexHtmlTag: {
					injectTo: 'body-prepend',
				},
			}),
			imageOptimizerPlugin({
				avif: {
					quality: 95,
				},
				includePublic: false,
				jpeg: {
					progressive: true,
					quality: 95,
				},
				png: {
					progressive: true,
					quality: 95,
				},
				svg: {
					multipass: true,
					plugins: [
						{
							name: 'preset-default',
							params: {
								cleanupIDs: {
									minify: false,
									remove: false,
								},
								convertPathData: false,
								overrides: {
									cleanupNumericValues: false,
									removeViewBox: false,
								},
							},
						},
						'sortAttrs',
						{
							name: 'addAttributesToSVGElement',
							params: {
								attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
							},
						},
					],
				},
				webp: {
					mixed: true,
					quality: 95,
				},
			}),
			htmlPlugin(),
			splitVendorChunkPlugin(),
			legacyPlugin(),
		],

		resolve: {
			alias: {
				'@fonts': fileURLToPath(new URL('./src/assets/fonts/', import.meta.url)),
				'@icons': fileURLToPath(new URL('./src/assets/images/icons/', import.meta.url)),
				'@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
				'@root': fileURLToPath(new URL('./', import.meta.url)),
				'@scripts': fileURLToPath(new URL('./src/assets/scripts/', import.meta.url)),
				'@src': fileURLToPath(new URL('./src/', import.meta.url)),
				'@styles': fileURLToPath(new URL('./src/assets/styles/', import.meta.url)),
				'@videos': fileURLToPath(new URL('./src/assets/videos/', import.meta.url)),
				'@views': fileURLToPath(new URL('./src/views/', import.meta.url)),
			},
		},

		server: {
			host: true,
			open: true,
		},
	};
});
