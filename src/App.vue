<template>
  <v-layout ref="app" class="rounded rounded-md" fluid style="height: 100vh;">
    <v-navigation-drawer color="grey-darken-2" permanent     
      width="100"
      name="app-bar2"
    >
        <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="List Item 1"></v-list-item>
        <v-list-item link title="List Item 2"></v-list-item>
        <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar
      color="grey-lighten-2"
      title="Application bar"
      flat
      name="app-bar"
    >
    
    <v-btn class="mx-auto" variant="text" @click="setData('footer')">
        Set data
      </v-btn>
    </v-app-bar>
    
    <v-main style="display: flex; height: 100vh; margin: 0;">
      <EditorComponent  @editor-ready="handleEditorReady" />
    </v-main>

  </v-layout>
</template>

<script>
import EditorComponent from './main_corner/ckeditor.vue'; // 引入新的組件
export default {
    methods: {
      handleEditorReady(editor)
      {        
        this.editorInstance = editor; // 儲存編輯器實例
      },
      callEditorMethod() {
        return this.editorInstance; // 返回局部變量
      },
      setData(data)
      {
          // 確保子組件存在
          if (this.editorInstance) {
            this.editorInstance.setEditorData(data); // 呼叫子組件的方法
          } else {
              console.error('editorComponent ref 不存在');
          }
      }
    },
    components: {
      EditorComponent,
      
    },
    data() {
        return {
            editorInstance: null // 用於儲存編輯器實例
        };
    },
    mounted() {
        window.app = this; // 將 Vue 實例掛載到 window 對象
    }
  };
  
</script>