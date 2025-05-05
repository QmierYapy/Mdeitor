<template>
  <v-layout ref="app" class="rounded rounded-md" fluid style="height: 100vh;">

    <v-navigation-drawer color="grey-darken-2" permanent width="200" name="app-bar2" >
      <FileExplorer @chose-path="handleChosePath" @read-path="handleReadPath"/>
    </v-navigation-drawer>

    <v-app-bar 
      color="grey-lighten-2" 
      flat 
      name="app-bar"
      >
      <v-toolbar-title class="text-left">{{ currentPath }}</v-toolbar-title>
      <template v-slot:prepend>
        <v-toolbar-items>
          <v-btn variant="tonal" dark @click="Savebtn"> Save this! </v-btn>
          <!--<v-btn variant="tonal" dark @click="handleReadPath"> Copy Path! </v-btn>
           <v-btn class="mx-auto" variant="tonal" @click="hide_alert('??','red','mdi-exclamation',1000)">
            Show alert? {{ alert.flag }}
          </v-btn> -->
        </v-toolbar-items>
      </template>      
      <v-toolbar-items>          
          <v-alert
            v-model="alert.flag"
            dark
            :color="alert.color"
            border="top"
            transition="slide-y-transition"
            density="compact"
            :icon="alert.icon"
          >
            {{ alert.text }}
          </v-alert>
        </v-toolbar-items>
    </v-app-bar>

    <v-main style="display: flex; height: 100vh; margin: 0;">
      <EditorComponent @editor-ready="handleEditorReady" />
    </v-main>

    <!--確認用容器 -->
    <ConfirmDlg ref="confirm" />

  </v-layout>
</template>

<script>
import EditorComponent from './main_corner/ckeditor.vue'; // 引入新的組件
import ConfirmDlg from './main_corner/ConfirmDlg.vue'; // 引入新的組件
import FileExplorer from './navigation_corner/file_explorer.vue'; // 引入新的組件
// 使用外部的 hash 函數庫，例如 crypto-js
import CryptoJS from 'crypto-js';

import { formatMarkdownWithHtmlBlocks } from './utils/formatMixedMarkdownHtml';

export default {
  methods: {
    handleEditorReady(editor) {
      this.editorInstance = editor; // 儲存編輯器實例         
    },
    hide_alert(text, color, icon, time) {
      //console.log('alert');
      this.alert.flag = true;
      this.alert.text = text;
      this.alert.color = color;
      this.alert.icon = icon;
      window.setTimeout(() => {
        this.alert.flag = false;
        //console.log("hide alert after 3 seconds");
      }, time);
    },
    async Savebtn() {
      if (this.currentFilePath !== '') {
          if (await this.$refs.confirm.open(
            "儲存檔案", 
            "確定儲存此檔案?", 
            {},
            "Yes",       // btn1
            "No"         // btn2
          )=== 'No') {
            return; // 如果用戶不想載入新檔案，則退出
          }
          this.saveFile(this.currentFilePath)
        } else {
          await this.$refs.confirm.open(
            "無選擇檔案", 
            "請先選擇檔案!", 
            {},
            "Yes",       // btn1
          )
        }

    },
    replaceTabsMarkers(data, reverse = false) {
      let result = data;

      if (reverse) {
        // 移除已包裝過的區塊
        result = result.replace(
          /```html\s*\n([\s\S]*?)\n```/gi,
          (_, content) => content
        );

        // 包裝 <script>
        result = result.replace(
          /<script\b[^>]*>[\s\S]*?<\/script>/gi,
          (match) => '```html\n' + match + '\n```'
        );

        // 包裝 <div>
        result = result.replace(
          /<div\b[^>]*>[\s\S]*?<\/div>/gi,
          (match) => '```html\n' + match + '\n```'
        );

        // 包裝 <span>
        result = result.replace(
          /<span\b[^>]*>[\s\S]*?<\/span>/gi,
          (match) => '```html\n' + match + '\n```'
        );

        // 包裝 HTML 註解
        result = result.replace(
          /<!--[\s\S]*?-->/g,
          (match) => '```html\n' + match + '\n```'
        );

      } else {
        // 還原所有包裝
        result = result.replace(
          /```html\s*\n([\s\S]*?)\n```/gi,
          (_, content) => content
        );
      }

      return result;
    },
    async saveFile(path)
    {
      let editorData = this.editorInstance.getData();         
        editorData =  this.replaceTabsMarkers(editorData);//替換成doscify可接受的tab flag
        editorData = editorData.replace(/&nbsp;/g, '');
        editorData = await formatMarkdownWithHtmlBlocks(editorData); // 使用 AST 處理 HTML 格式化
        this.originalHash = CryptoJS.SHA256(editorData).toString(); //計算hash

        await window.electronAPI.saveFile(path, editorData);
        this.hide_alert('Save file success.', 'green', 'mdi-file-check', 3000);
    },
    async loadFile(path)
    {        
        // 更新目前檔案路徑和內容
        let data = await window.electronAPI.loadFileContent(path);   
        data = await formatMarkdownWithHtmlBlocks(data); // 使用 AST 處理 格式化     
        data = data.replace(/&nbsp;/g, '');
        this.originalHash = CryptoJS.SHA256(data).toString();//計算hash        
        data = this.replaceTabsMarkers(data, true);//替換成ckeditor可接受的tab flag
        
        console.log('load ori',this.originalHash);
        this.currentFilePath = path;
        this.currentPath = path.replace(/\\\\/g, '\\'); // 更新当前路径
        this.editorInstance.setData(data); // 設定編輯器內容
        this.hide_alert('Read file success.', 'green', 'mdi-file-check', 2000);
    },
    handleChosePath(path){
        if (path) {
            if (path.startsWith('"') && path.endsWith('"')) {
              // 去除開頭和結尾的引號
              path = path.slice(1, -1);
            }    
            this.currentPath =  path.replace(/\\\\/g, '\\'); // 更新当前路径
        }
    },
    async handleReadPath(path) {
      if (path) {
        if (path.startsWith('"') && path.endsWith('"')) {
          // 去除開頭和結尾的引號
          path = path.slice(1, -1);
        }
        // console.log("PATH:", path);

        // 確認是否要載入新檔案
        if (await this.$refs.confirm.open(
          "載入檔案", 
          "確定要載入此檔案?", 
          {},
          "Yes",       // btn1
          "No"         // btn2
        )=== 'No') {
          return; // 如果用戶不想載入新檔案，則退出
        }

        let data = '';
        let newHash = '';
        let custumosChose ='';
        // 如果原始內容哈希不為空，表示已經有檔案被載入
        if (this.originalHash !== '') {
          // 讀取文件內容來計算哈希值，但不設置到編輯器中
          data = this.editorInstance.getData();       
          data =  this.replaceTabsMarkers(data);//替換成doscify可接受的tab flag
          data = data.replace(/&nbsp;/g, '');   
          data = await formatMarkdownWithHtmlBlocks(data); // 使用 AST 處理 HTML 格式化
          
          console.log('loaddata\n',data);
          newHash = CryptoJS.SHA256(data).toString();
          console.log('current',newHash);
          console.log('ori',this.originalHash);
          // console.log('check', data);
          // 檢查是否有未保存的變更
          if (this.originalHash !== newHash) {
            // 確認是否要覆寫
            custumosChose = await this.$refs.confirm.open(
              "檔案變更", 
              "檔案內容尚未儲存，確定要讀取嗎?",
              {},
              "取消", // btn1
              "儲存", // btn2
              "略過", // btn3
            );
          }
        } 
        if(custumosChose === "取消")
        {
          return; // 
        }
        else if(custumosChose === "儲存")
        {
          await this.saveFile(this.currentFilePath);
        }
        this.loadFile(path);

      }
    },
  },
  components: {
    EditorComponent,
    ConfirmDlg,
    FileExplorer,
  },
  data() {
    return {
      editorInstance: null, // 用於儲存編輯器實例
      alert: { flag: false, text: '', color: 'red', icon: '' },
      currentPath : '尚未選擇路徑',
      currentFilePath : '',
      originalHash: '', // 用於存儲原始內容的哈希值
    };
  },
  mounted() {
    window.app = this; // 將 Vue 實例掛載到 window 對象
  }
};
</script>