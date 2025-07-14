// vite.config.js
import legacyPlugin from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import pugPlugin from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/@vituum/vite-plugin-pug/index.js";
import postcssAutoprefixer from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/autoprefixer/lib/autoprefixer.js";
import postcssMergeLonghand from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/postcss-merge-longhand/src/index.js";
import postcssPresetEnv from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/postcss-preset-env/dist/index.mjs";
import postcssSortMediaQueries from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/postcss-sort-media-queries/index.js";
import { URL, fileURLToPath } from "url";
import { defineConfig, splitVendorChunkPlugin } from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/vite/dist/node/index.js";
import { ViteImageOptimizer as imageOptimizerPlugin } from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import createSvgSpritePlugin from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/vite-plugin-svg-spriter/lib/index.js";
import vituumPlugin from "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/node_modules/vituum/src/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/helgi/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/landing-dns/vite.config.js";
var htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replaceAll(
        /(?:^|[^а-яёА-ЯЁ0-9_])(в|без|а|до|из|к|я|на|по|о|от|перед|при|через|с|у|за|над|об|под|про|для|и|или|со|около|между)(?:^|[^а-яёА-ЯЁ0-9_])/g,
        (match) => {
          return match.slice(-1) === " " ? `${match.substr(0, match.length - 1)}&nbsp;` : match;
        }
      );
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => {
  return {
    appType: "mpa",
    base: "./",
    build: {
      assetsInlineLimit: 0,
      outDir: "build",
      rollupOptions: {
        output: {
          assetFileNames: ({ name }) => {
            if (/\.(jpe?g|png|gif|tiff|webp|svg|avif)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/styles/[name]-[hash][extname]";
            }
            if (/\.(woff2?|ttf|otf|eot)$/.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            if (/\.(mp3|ogg|wav|mp4|ogv|webm)$/.test(name ?? "")) {
              return "assets/videos/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
          chunkFileNames: "assets/scripts/[name]-[hash].js",
          entryFileNames: "assets/scripts/[name]-[hash].js",
          manualChunks: (id) => {
            if (id.includes("vendor.scss")) return "vendor";
            if (id.includes("font.scss")) return "font";
            return null;
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          postcssSortMediaQueries({
            sort: "desktop-first"
          }),
          ...mode === "production" ? [postcssPresetEnv(), postcssMergeLonghand(), postcssAutoprefixer({ cascade: true, grid: "autoplace" })] : []
        ]
      }
    },
    plugins: [
      vituumPlugin({
        imports: {
          filenamePattern: { "+.css": [], "+.js": "src/assets/scripts", "+.scss": "src/assets/styles/" }
        },
        input: ["./src/views/pages/**/*.pug"],
        pages: {
          dir: "./src/views/pages/",
          normalizeBasePath: true
        }
      }),
      pugPlugin({
        data: "./src/views/data/**/*.json",
        root: "./src/"
      }),
      createSvgSpritePlugin({
        svgFolder: "./src/assets/images/icons/",
        svgSpriteConfig: {
          shape: {
            transform: [
              {
                svgo: {
                  plugins: [
                    "preset-default",
                    {
                      name: "removeAttrs",
                      active: true,
                      params: {
                        attrs: "(fill|fill-opacity|fill-rule|stroke|stroke-width|stroke-linecap|stroke-linejoin|stroke-opacity|opacity|clip-rule)"
                      }
                    },
                    {
                      name: "removeDimensions",
                      active: true
                    },
                    {
                      name: "removeViewBox",
                      active: false
                    },
                    {
                      name: "inlineStyles",
                      active: true,
                      params: {
                        onlyMatchedOnce: false
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        transformIndexHtmlTag: {
          injectTo: "body-prepend"
        }
      }),
      imageOptimizerPlugin({
        avif: {
          quality: 95
        },
        includePublic: false,
        jpeg: {
          progressive: true,
          quality: 95
        },
        png: {
          progressive: true,
          quality: 95
        },
        svg: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                cleanupIDs: {
                  minify: false,
                  remove: false
                },
                convertPathData: false,
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false
                }
              }
            },
            "sortAttrs",
            {
              name: "addAttributesToSVGElement",
              params: {
                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
              }
            }
          ]
        },
        webp: {
          mixed: true,
          quality: 95
        }
      }),
      htmlPlugin(),
      splitVendorChunkPlugin(),
      legacyPlugin()
    ],
    resolve: {
      alias: {
        "@fonts": fileURLToPath(new URL("./src/assets/fonts/", __vite_injected_original_import_meta_url)),
        "@icons": fileURLToPath(new URL("./src/assets/images/icons/", __vite_injected_original_import_meta_url)),
        "@images": fileURLToPath(new URL("./src/assets/images/", __vite_injected_original_import_meta_url)),
        "@root": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
        "@scripts": fileURLToPath(new URL("./src/assets/scripts/", __vite_injected_original_import_meta_url)),
        "@src": fileURLToPath(new URL("./src/", __vite_injected_original_import_meta_url)),
        "@styles": fileURLToPath(new URL("./src/assets/styles/", __vite_injected_original_import_meta_url)),
        "@videos": fileURLToPath(new URL("./src/assets/videos/", __vite_injected_original_import_meta_url)),
        "@views": fileURLToPath(new URL("./src/views/", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      open: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxoZWxnaVxcXFxPbmVEcml2ZVxcXFxcdTA0MjBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDdcdTA0MzhcdTA0MzkgXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDNCXFxcXGxhbmRpbmctZG5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxoZWxnaVxcXFxPbmVEcml2ZVxcXFxcdTA0MjBcdTA0MzBcdTA0MzFcdTA0M0VcdTA0NDdcdTA0MzhcdTA0MzkgXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDNCXFxcXGxhbmRpbmctZG5zXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9oZWxnaS9PbmVEcml2ZS8lRDAlQTAlRDAlQjAlRDAlQjElRDAlQkUlRDElODclRDAlQjglRDAlQjklMjAlRDElODElRDElODIlRDAlQkUlRDAlQkIvbGFuZGluZy1kbnMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgbGVnYWN5UGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSc7XG5pbXBvcnQgcHVnUGx1Z2luIGZyb20gJ0B2aXR1dW0vdml0ZS1wbHVnaW4tcHVnJztcbmltcG9ydCBwb3N0Y3NzQXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XG5pbXBvcnQgcG9zdGNzc01lcmdlTG9uZ2hhbmQgZnJvbSAncG9zdGNzcy1tZXJnZS1sb25naGFuZCc7XG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tICdwb3N0Y3NzLXByZXNldC1lbnYnO1xuaW1wb3J0IHBvc3Rjc3NTb3J0TWVkaWFRdWVyaWVzIGZyb20gJ3Bvc3Rjc3Mtc29ydC1tZWRpYS1xdWVyaWVzJztcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciBhcyBpbWFnZU9wdGltaXplclBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XG5pbXBvcnQgY3JlYXRlU3ZnU3ByaXRlUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVyJztcbmltcG9ydCB2aXR1dW1QbHVnaW4gZnJvbSAndml0dXVtJztcblxuY29uc3QgaHRtbFBsdWdpbiA9ICgpID0+IHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnaHRtbC10cmFuc2Zvcm0nLFxuXHRcdHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG5cdFx0XHRyZXR1cm4gaHRtbC5yZXBsYWNlQWxsKFxuXHRcdFx0XHQvKD86XnxbXlx1MDQzMC1cdTA0NEZcdTA0NTFcdTA0MTAtXHUwNDJGXHUwNDAxMC05X10pKFx1MDQzMnxcdTA0MzFcdTA0MzVcdTA0Mzd8XHUwNDMwfFx1MDQzNFx1MDQzRXxcdTA0MzhcdTA0Mzd8XHUwNDNBfFx1MDQ0RnxcdTA0M0RcdTA0MzB8XHUwNDNGXHUwNDNFfFx1MDQzRXxcdTA0M0VcdTA0NDJ8XHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0fFx1MDQzRlx1MDQ0MFx1MDQzOHxcdTA0NDdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0Mzd8XHUwNDQxfFx1MDQ0M3xcdTA0MzdcdTA0MzB8XHUwNDNEXHUwNDMwXHUwNDM0fFx1MDQzRVx1MDQzMXxcdTA0M0ZcdTA0M0VcdTA0MzR8XHUwNDNGXHUwNDQwXHUwNDNFfFx1MDQzNFx1MDQzQlx1MDQ0RnxcdTA0Mzh8XHUwNDM4XHUwNDNCXHUwNDM4fFx1MDQ0MVx1MDQzRXxcdTA0M0VcdTA0M0FcdTA0M0VcdTA0M0JcdTA0M0V8XHUwNDNDXHUwNDM1XHUwNDM2XHUwNDM0XHUwNDQzKSg/Ol58W15cdTA0MzAtXHUwNDRGXHUwNDUxXHUwNDEwLVx1MDQyRlx1MDQwMTAtOV9dKS9nLFxuXHRcdFx0XHQobWF0Y2gpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoLTEpID09PSAnICcgPyBgJHttYXRjaC5zdWJzdHIoMCwgbWF0Y2gubGVuZ3RoIC0gMSl9Jm5ic3A7YCA6IG1hdGNoO1xuXHRcdFx0XHR9LFxuXHRcdFx0KTtcblx0XHR9LFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdGFwcFR5cGU6ICdtcGEnLFxuXG5cdFx0YmFzZTogJy4vJyxcblxuXHRcdGJ1aWxkOiB7XG5cdFx0XHRhc3NldHNJbmxpbmVMaW1pdDogMCxcblx0XHRcdG91dERpcjogJ2J1aWxkJyxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdFx0YXNzZXRGaWxlTmFtZXM6ICh7IG5hbWUgfSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKC9cXC4oanBlP2d8cG5nfGdpZnx0aWZmfHdlYnB8c3ZnfGF2aWYpJC8udGVzdChuYW1lID8/ICcnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2Fzc2V0cy9pbWFnZXMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICgvXFwuY3NzJC8udGVzdChuYW1lID8/ICcnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2Fzc2V0cy9zdHlsZXMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICgvXFwuKHdvZmYyP3x0dGZ8b3RmfGVvdCkkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnYXNzZXRzL2ZvbnRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoL1xcLihtcDN8b2dnfHdhdnxtcDR8b2d2fHdlYm0pJC8udGVzdChuYW1lID8/ICcnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2Fzc2V0cy92aWRlb3MvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvc2NyaXB0cy9bbmFtZV0tW2hhc2hdLmpzJyxcblx0XHRcdFx0XHRlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9zY3JpcHRzL1tuYW1lXS1baGFzaF0uanMnLFxuXHRcdFx0XHRcdG1hbnVhbENodW5rczogKGlkKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoaWQuaW5jbHVkZXMoJ3ZlbmRvci5zY3NzJykpIHJldHVybiAndmVuZG9yJztcblx0XHRcdFx0XHRcdGlmIChpZC5pbmNsdWRlcygnZm9udC5zY3NzJykpIHJldHVybiAnZm9udCc7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0Y3NzOiB7XG5cdFx0XHRwb3N0Y3NzOiB7XG5cdFx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0XHRwb3N0Y3NzU29ydE1lZGlhUXVlcmllcyh7XG5cdFx0XHRcdFx0XHRzb3J0OiAnZGVza3RvcC1maXJzdCcsXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0Li4uKG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xuXHRcdFx0XHRcdFx0PyBbcG9zdGNzc1ByZXNldEVudigpLCBwb3N0Y3NzTWVyZ2VMb25naGFuZCgpLCBwb3N0Y3NzQXV0b3ByZWZpeGVyKHsgY2FzY2FkZTogdHJ1ZSwgZ3JpZDogJ2F1dG9wbGFjZScgfSldXG5cdFx0XHRcdFx0XHQ6IFtdKSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdHZpdHV1bVBsdWdpbih7XG5cdFx0XHRcdGltcG9ydHM6IHtcblx0XHRcdFx0XHRmaWxlbmFtZVBhdHRlcm46IHsgJysuY3NzJzogW10sICcrLmpzJzogJ3NyYy9hc3NldHMvc2NyaXB0cycsICcrLnNjc3MnOiAnc3JjL2Fzc2V0cy9zdHlsZXMvJyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbnB1dDogWycuL3NyYy92aWV3cy9wYWdlcy8qKi8qLnB1ZyddLFxuXHRcdFx0XHRwYWdlczoge1xuXHRcdFx0XHRcdGRpcjogJy4vc3JjL3ZpZXdzL3BhZ2VzLycsXG5cdFx0XHRcdFx0bm9ybWFsaXplQmFzZVBhdGg6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSxcblx0XHRcdHB1Z1BsdWdpbih7XG5cdFx0XHRcdGRhdGE6ICcuL3NyYy92aWV3cy9kYXRhLyoqLyouanNvbicsXG5cdFx0XHRcdHJvb3Q6ICcuL3NyYy8nLFxuXHRcdFx0fSksXG5cdFx0XHRjcmVhdGVTdmdTcHJpdGVQbHVnaW4oe1xuXHRcdFx0XHRzdmdGb2xkZXI6ICcuL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zLycsXG5cdFx0XHRcdHN2Z1Nwcml0ZUNvbmZpZzoge1xuXHRcdFx0XHRcdHNoYXBlOiB7XG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm06IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHN2Z286IHtcblx0XHRcdFx0XHRcdFx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0J3ByZXNldC1kZWZhdWx0Jyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdyZW1vdmVBdHRycycsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBhcmFtczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cnM6ICcoZmlsbHxmaWxsLW9wYWNpdHl8ZmlsbC1ydWxlfHN0cm9rZXxzdHJva2Utd2lkdGh8c3Ryb2tlLWxpbmVjYXB8c3Ryb2tlLWxpbmVqb2lufHN0cm9rZS1vcGFjaXR5fG9wYWNpdHl8Y2xpcC1ydWxlKScsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdyZW1vdmVEaW1lbnNpb25zJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiAncmVtb3ZlVmlld0JveCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWN0aXZlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdpbmxpbmVTdHlsZXMnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwYXJhbXM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9ubHlNYXRjaGVkT25jZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0dHJhbnNmb3JtSW5kZXhIdG1sVGFnOiB7XG5cdFx0XHRcdFx0aW5qZWN0VG86ICdib2R5LXByZXBlbmQnLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0XHRpbWFnZU9wdGltaXplclBsdWdpbih7XG5cdFx0XHRcdGF2aWY6IHtcblx0XHRcdFx0XHRxdWFsaXR5OiA5NSxcblx0XHRcdFx0fSxcblx0XHRcdFx0aW5jbHVkZVB1YmxpYzogZmFsc2UsXG5cdFx0XHRcdGpwZWc6IHtcblx0XHRcdFx0XHRwcm9ncmVzc2l2ZTogdHJ1ZSxcblx0XHRcdFx0XHRxdWFsaXR5OiA5NSxcblx0XHRcdFx0fSxcblx0XHRcdFx0cG5nOiB7XG5cdFx0XHRcdFx0cHJvZ3Jlc3NpdmU6IHRydWUsXG5cdFx0XHRcdFx0cXVhbGl0eTogOTUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN2Zzoge1xuXHRcdFx0XHRcdG11bHRpcGFzczogdHJ1ZSxcblx0XHRcdFx0XHRwbHVnaW5zOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6ICdwcmVzZXQtZGVmYXVsdCcsXG5cdFx0XHRcdFx0XHRcdHBhcmFtczoge1xuXHRcdFx0XHRcdFx0XHRcdGNsZWFudXBJRHM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdG1pbmlmeTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRyZW1vdmU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0Y29udmVydFBhdGhEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRvdmVycmlkZXM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNsZWFudXBOdW1lcmljVmFsdWVzOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRcdHJlbW92ZVZpZXdCb3g6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3NvcnRBdHRycycsXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6ICdhZGRBdHRyaWJ1dGVzVG9TVkdFbGVtZW50Jyxcblx0XHRcdFx0XHRcdFx0cGFyYW1zOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlczogW3sgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgfV0sXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHdlYnA6IHtcblx0XHRcdFx0XHRtaXhlZDogdHJ1ZSxcblx0XHRcdFx0XHRxdWFsaXR5OiA5NSxcblx0XHRcdFx0fSxcblx0XHRcdH0pLFxuXHRcdFx0aHRtbFBsdWdpbigpLFxuXHRcdFx0c3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLFxuXHRcdFx0bGVnYWN5UGx1Z2luKCksXG5cdFx0XSxcblxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiB7XG5cdFx0XHRcdCdAZm9udHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9mb250cy8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0J0BpY29ucyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0J0BpbWFnZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9pbWFnZXMvJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdCdAcm9vdCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0J0BzY3JpcHRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvc2NyaXB0cy8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0J0BzcmMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjLycsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0XHQnQHN0eWxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcy8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0J0B2aWRlb3MnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy92aWRlb3MvJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdCdAdmlld3MnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3ZpZXdzLycsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0c2VydmVyOiB7XG5cdFx0XHRob3N0OiB0cnVlLFxuXHRcdFx0b3BlbjogdHJ1ZSxcblx0XHR9LFxuXHR9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVZLE9BQU8sa0JBQWtCO0FBQ2hhLE9BQU8sZUFBZTtBQUN0QixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLDBCQUEwQjtBQUNqQyxPQUFPLHNCQUFzQjtBQUM3QixPQUFPLDZCQUE2QjtBQUNwQyxTQUFTLEtBQUsscUJBQXFCO0FBQ25DLFNBQVMsY0FBYyw4QkFBOEI7QUFDckQsU0FBUyxzQkFBc0IsNEJBQTRCO0FBQzNELE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU8sa0JBQWtCO0FBVjBMLElBQU0sMkNBQTJDO0FBWXBRLElBQU0sYUFBYSxNQUFNO0FBQ3hCLFNBQU87QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLG1CQUFtQixNQUFNO0FBQ3hCLGFBQU8sS0FBSztBQUFBLFFBQ1g7QUFBQSxRQUNBLENBQUMsVUFBVTtBQUNWLGlCQUFPLE1BQU0sTUFBTSxFQUFFLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLENBQUMsV0FBVztBQUFBLFFBQ2pGO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN6QyxTQUFPO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFFVCxNQUFNO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTixtQkFBbUI7QUFBQSxNQUNuQixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDZCxRQUFRO0FBQUEsVUFDUCxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUM3QixnQkFBSSx3Q0FBd0MsS0FBSyxRQUFRLEVBQUUsR0FBRztBQUM3RCxxQkFBTztBQUFBLFlBQ1I7QUFFQSxnQkFBSSxTQUFTLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDOUIscUJBQU87QUFBQSxZQUNSO0FBRUEsZ0JBQUksMEJBQTBCLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDL0MscUJBQU87QUFBQSxZQUNSO0FBRUEsZ0JBQUksZ0NBQWdDLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDckQscUJBQU87QUFBQSxZQUNSO0FBRUEsbUJBQU87QUFBQSxVQUNSO0FBQUEsVUFDQSxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixjQUFjLENBQUMsT0FBTztBQUNyQixnQkFBSSxHQUFHLFNBQVMsYUFBYSxFQUFHLFFBQU87QUFDdkMsZ0JBQUksR0FBRyxTQUFTLFdBQVcsRUFBRyxRQUFPO0FBQ3JDLG1CQUFPO0FBQUEsVUFDUjtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0osU0FBUztBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1Isd0JBQXdCO0FBQUEsWUFDdkIsTUFBTTtBQUFBLFVBQ1AsQ0FBQztBQUFBLFVBQ0QsR0FBSSxTQUFTLGVBQ1YsQ0FBQyxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBRyxvQkFBb0IsRUFBRSxTQUFTLE1BQU0sTUFBTSxZQUFZLENBQUMsQ0FBQyxJQUN0RyxDQUFDO0FBQUEsUUFDTDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUixhQUFhO0FBQUEsUUFDWixTQUFTO0FBQUEsVUFDUixpQkFBaUIsRUFBRSxTQUFTLENBQUMsR0FBRyxRQUFRLHNCQUFzQixVQUFVLHFCQUFxQjtBQUFBLFFBQzlGO0FBQUEsUUFDQSxPQUFPLENBQUMsNEJBQTRCO0FBQUEsUUFDcEMsT0FBTztBQUFBLFVBQ04sS0FBSztBQUFBLFVBQ0wsbUJBQW1CO0FBQUEsUUFDcEI7QUFBQSxNQUNELENBQUM7QUFBQSxNQUNELFVBQVU7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELHNCQUFzQjtBQUFBLFFBQ3JCLFdBQVc7QUFBQSxRQUNYLGlCQUFpQjtBQUFBLFVBQ2hCLE9BQU87QUFBQSxZQUNOLFdBQVc7QUFBQSxjQUNWO0FBQUEsZ0JBQ0MsTUFBTTtBQUFBLGtCQUNMLFNBQVM7QUFBQSxvQkFDUjtBQUFBLG9CQUNBO0FBQUEsc0JBQ0MsTUFBTTtBQUFBLHNCQUNOLFFBQVE7QUFBQSxzQkFDUixRQUFRO0FBQUEsd0JBQ1AsT0FBTztBQUFBLHNCQUNSO0FBQUEsb0JBQ0Q7QUFBQSxvQkFDQTtBQUFBLHNCQUNDLE1BQU07QUFBQSxzQkFDTixRQUFRO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQTtBQUFBLHNCQUNDLE1BQU07QUFBQSxzQkFDTixRQUFRO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQTtBQUFBLHNCQUNDLE1BQU07QUFBQSxzQkFDTixRQUFRO0FBQUEsc0JBQ1IsUUFBUTtBQUFBLHdCQUNQLGlCQUFpQjtBQUFBLHNCQUNsQjtBQUFBLG9CQUNEO0FBQUEsa0JBQ0Q7QUFBQSxnQkFDRDtBQUFBLGNBQ0Q7QUFBQSxZQUNEO0FBQUEsVUFDRDtBQUFBLFFBQ0Q7QUFBQSxRQUNBLHVCQUF1QjtBQUFBLFVBQ3RCLFVBQVU7QUFBQSxRQUNYO0FBQUEsTUFDRCxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNwQixNQUFNO0FBQUEsVUFDTCxTQUFTO0FBQUEsUUFDVjtBQUFBLFFBQ0EsZUFBZTtBQUFBLFFBQ2YsTUFBTTtBQUFBLFVBQ0wsYUFBYTtBQUFBLFVBQ2IsU0FBUztBQUFBLFFBQ1Y7QUFBQSxRQUNBLEtBQUs7QUFBQSxVQUNKLGFBQWE7QUFBQSxVQUNiLFNBQVM7QUFBQSxRQUNWO0FBQUEsUUFDQSxLQUFLO0FBQUEsVUFDSixXQUFXO0FBQUEsVUFDWCxTQUFTO0FBQUEsWUFDUjtBQUFBLGNBQ0MsTUFBTTtBQUFBLGNBQ04sUUFBUTtBQUFBLGdCQUNQLFlBQVk7QUFBQSxrQkFDWCxRQUFRO0FBQUEsa0JBQ1IsUUFBUTtBQUFBLGdCQUNUO0FBQUEsZ0JBQ0EsaUJBQWlCO0FBQUEsZ0JBQ2pCLFdBQVc7QUFBQSxrQkFDVixzQkFBc0I7QUFBQSxrQkFDdEIsZUFBZTtBQUFBLGdCQUNoQjtBQUFBLGNBQ0Q7QUFBQSxZQUNEO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxjQUNDLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxnQkFDUCxZQUFZLENBQUMsRUFBRSxPQUFPLDZCQUE2QixDQUFDO0FBQUEsY0FDckQ7QUFBQSxZQUNEO0FBQUEsVUFDRDtBQUFBLFFBQ0Q7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxRQUNWO0FBQUEsTUFDRCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsTUFDWCx1QkFBdUI7QUFBQSxNQUN2QixhQUFhO0FBQUEsSUFDZDtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1IsT0FBTztBQUFBLFFBQ04sVUFBVSxjQUFjLElBQUksSUFBSSx1QkFBdUIsd0NBQWUsQ0FBQztBQUFBLFFBQ3ZFLFVBQVUsY0FBYyxJQUFJLElBQUksOEJBQThCLHdDQUFlLENBQUM7QUFBQSxRQUM5RSxXQUFXLGNBQWMsSUFBSSxJQUFJLHdCQUF3Qix3Q0FBZSxDQUFDO0FBQUEsUUFDekUsU0FBUyxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxRQUNyRCxZQUFZLGNBQWMsSUFBSSxJQUFJLHlCQUF5Qix3Q0FBZSxDQUFDO0FBQUEsUUFDM0UsUUFBUSxjQUFjLElBQUksSUFBSSxVQUFVLHdDQUFlLENBQUM7QUFBQSxRQUN4RCxXQUFXLGNBQWMsSUFBSSxJQUFJLHdCQUF3Qix3Q0FBZSxDQUFDO0FBQUEsUUFDekUsV0FBVyxjQUFjLElBQUksSUFBSSx3QkFBd0Isd0NBQWUsQ0FBQztBQUFBLFFBQ3pFLFVBQVUsY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFBQSxNQUNqRTtBQUFBLElBQ0Q7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNQO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
