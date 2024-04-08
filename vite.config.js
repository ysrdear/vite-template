import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const dependencies = require("./package.json").dependencies;

export default defineConfig({
  base: "./",
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://5doujy.xicp.vip:1201/", //目标域名
        changeOrigin: true, //需要代理跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //路径重写，把'/api'替换为''
      },
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/base.scss";`,
        sassOptions: { outputStyle: "expanded" },
      },
    },
  },
  build: {
    assetsInclude: ["**/*.woff", "**/*.ttf"],
    brotliSize: false, // 设置为false将禁用构建的brotli压缩大小报告。可以稍微提高构建速度
    minify: true, // 开启压缩
    rollupOptions: {
      output: {
        treeshake: true, // 开启 Tree Shaking，消除未使用的代码，减小最终的包大小
        // 根据不同的js库 拆分包，减少index.js包体积
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 指定需要拆分的第三方库或模块
            console.info("id", id);
            const dependenciesKeys = Object.keys(dependencies);

            const match = dependenciesKeys.find((item) => {
              return id.includes(item);
            });
            console.info("match", match);
            const notSplit = ["vue", "ant-design-vue"];
            if (match && !notSplit.includes(match)) {
              return match;
            }
          }
        },
      },
    },
  },
});
