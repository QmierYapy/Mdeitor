const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.plugin('define')
      .tap(definitions => {
        Object.assign(definitions[0], {
          __VUE_OPTIONS_API__: JSON.stringify(true), // Enable if you're using Options API
          __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
        });
        return definitions;
      });
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,     // 安全性考量，預設關閉
      contextIsolation: true,     // 強制隔離渲染進程
      preload: 'src/preload.js',  // 預加載腳本（確保安全）
      builderOptions: {
        appId: 'com.example.mdeditor',
        productName: 'mdEditor',
        extraResources: ['./src/preload.js'],
        win: {
          target: ['portable'],  // 免安裝版本
          icon: 'public/icon.ico'
        },
        portable: {
          artifactName: '${productName}.exe'  // 讓輸出的檔案名稱為
          // mdEditor.exe
        }
      }
    }
  }
});
