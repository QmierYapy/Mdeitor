<template>
  <v-layout ref="app" class="rounded rounded-md" fluid style="height: 100vh;">
    <v-navigation-drawer color="grey-darken-2" permanent width="200" name="app-bar2">
      <FileExplorer @chose-path="handleChosePath" />
    </v-navigation-drawer>

    <v-app-bar 
      color="grey-lighten-2" 
      flat name="app-bar"
      title="MD Editor"
      >
      <template v-slot:prepend>
        <v-toolbar-items>
          <v-btn variant="tonal" dark @click="delRecord"> Delete this! </v-btn>
          <v-btn class="mx-auto" variant="tonal" @click="hide_alert('??','red','mdi-exclamation',1000)">
            Show alert? {{ alert.flag }}
          </v-btn>
          <v-btn @click="setData('footer')"> Set data </v-btn>
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
    <ConfirmDlg ref="confirm" />
  </v-layout>
</template>

<script>
import EditorComponent from './main_corner/ckeditor.vue'; // 引入新的組件
import ConfirmDlg from './main_corner/ConfirmDlg.vue'; // 引入新的組件
import FileExplorer from './navigation_corner/file_explorer.vue'; // 引入新的組件

export default {
  methods: {
    handleEditorReady(editor) {
      this.editorInstance = editor; // 儲存編輯器實例
    },
    callEditorMethod() {
      return this.editorInstance; // 返回局部變量
    },
    setData(data) {
      // 確保子組件存在
      if (this.editorInstance) {
        this.editorInstance.setData(data); // 呼叫子組件的方法
        this.hide_alert('Save success!!', 'green', 'mdi-content-save', 2000);
      } else {
        console.error('editorComponent ref 不存在');
      }
    },
    hide_alert(text, color, icon, time) {
      console.log('alert');
      this.alert.flag = true;
      this.alert.text = text;
      this.alert.color = color;
      this.alert.icon = icon;
      window.setTimeout(() => {
        this.alert.flag = false;
        console.log("hide alert after 3 seconds");
      }, time);
    },
    async delRecord() {
      if (await this.$refs.confirm.open("Confirm", "Are you sure you want to delete this record?")) {
        this.deleteRecord();
      }
    },
    deleteRecord() {
      console.log("Record deleted.");
    },
    handleChosePath(path){
        if (path) {
            //loadFolderList(selectedDirectory);
            this.currentFilePath = path; // 更新当前路径
            this.setData(path);
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
      currentFilePath : '',
    };
  },
  mounted() {
    window.app = this; // 將 Vue 實例掛載到 window 對象
  }
};
</script>