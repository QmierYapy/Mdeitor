<template>
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="選擇資料夾"  @click="choseDir()"></v-list-item>
    <v-list-item link title="Temp"   @click="checkFile()"></v-list-item>
    <v-treeview
        :items="file_item"
        return-object
        v-model:selected="selection"
        @click:select="selectEvent()"
        @click:open="addChild" 
    >
        <template v-slot:prepend="{ item, isOpen } "> 
                <v-icon v-if="!item.filetype">
                    {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ files[item.filetype]|| 'mdi-file' }}
                </v-icon>
        </template>
  </v-treeview>
  <!--<pre>{{ file_item }}</pre>-->

</template>
<script>
//import FileExplorerTreeview from './navigation_corner/file_explorer_treeview.vue'; // 引入新的組件

export default {
    emits: ['chose-path','read-path'], // 宣告自定義事件
    methods: {
        async loadFolderList(directoryPath) {
            const structure = await window.electronAPI.loadFolderStructure(directoryPath);
            //const treeview_structure = this.readDirectoryRecursive(structure);
            //this.file_item = JSON.stringify(structure); // 將 structure 轉換為 JSON
            this.file_item = structure; // 將 structure 轉換為 JSON
            this.$emit('chose-path', JSON.stringify(this.file_item));//這是反向對上層執行動作並帶路徑
            console.log('Load Folder List:', structure);
        },
        selectEvent() {
            this.$nextTick(() => {
                this.$emit('chose-path', JSON.stringify(this.selection[0]));//這是反向對上層執行動作並帶路徑
                this.$emit('read-path', JSON.stringify(this.selection[0].path));//這是反向對上層執行動作並帶路徑
                this.selection=[];
            });
        },
        async addChild(item) {
            const structure = await window.electronAPI.loadFolderStructure(item.id.path);
            item.id.children=structure;
        },
        async choseDir(){
            const selectedDirectory = await window.electronAPI.selectDirectory()
            if (selectedDirectory) {
                this.currentFilePath = selectedDirectory; // 更新当前路径
                    this.loadFolderList(selectedDirectory)
                //this.$emit('chose-path', this.currentFilePath);//這是反向對上層執行動作並帶路徑
            }
        },
        checkFile(){
            console.log('目前:',this.file_item);
        },
    },
    watch: {
        currentFilePath(newcurrentFilePath) {
            console.log('觸發更新：', newcurrentFilePath);
        },
    },
    data() {
        return {
            currentFilePath : [],
            selection: [],
            file_item:['請選擇路徑'],
            initiallyOpen: ['public'],
            files: {
                html: 'mdi-language-html5',
                js: 'mdi-nodejs',
                json: 'mdi-code-json',
                md: 'mdi-language-markdown',
                pdf: 'mdi-file-pdf-box',
                png: 'mdi-file-image',
                txt: 'mdi-file-document-outline',
                xls: 'mdi-file-excel',
            },
        };
    },
};
</script>