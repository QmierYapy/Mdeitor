<template>
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="選擇資料夾"  @click="choseDir()"></v-list-item>
    <v-list-item link title="List Item 2"></v-list-item>
    <v-treeview
        :items="file_item"
        :opened="initiallyOpen"
        density="compact"
        activatable
        open-on-click
       
    >
        <template v-slot:prepend="{ item, isOpen } "> 
            <div @click="onItemClick(item)" >
                <v-icon v-if="!item.filetype">
                    {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ files[item.filetype] }}
                </v-icon>
                {{item.title }}
            </div>
        </template>  

  </v-treeview>
  <!--<pre>{{ file_item }}</pre>-->

</template>
<script>
//import FileExplorerTreeview from './navigation_corner/file_explorer_treeview.vue'; // 引入新的組件

export default {
    emits: ['chose-path'], // 宣告自定義事件
    methods: {
        async loadFolderList(directoryPath) {
            const structure = await window.electronAPI.loadFolderStructure(directoryPath);
            //const treeview_structure = this.readDirectoryRecursive(structure);
            //this.file_item = JSON.stringify(structure); // 將 structure 轉換為 JSON
            this.file_item = structure; // 將 structure 轉換為 JSON
            this.$emit('chose-path', JSON.stringify(this.file_item));//這是反向對上層執行動作並帶路徑
        },
        onItemClick(item) {
        // 在這裡處理點擊事件
        console.log('點擊了項目：',item);
        // 您可以在這裡執行打開文件、導航等操作
        },
        async choseDir(){
            const selectedDirectory = await window.electronAPI.selectDirectory()
            if (selectedDirectory) {
                this.currentFilePath = selectedDirectory; // 更新当前路径
                this.loadFolderList(selectedDirectory)
                //this.$emit('chose-path', this.currentFilePath);//這是反向對上層執行動作並帶路徑
            }
        },
    },
    data() {
        return {
            currentFilePath : '',
            active: [],
            file_item:[
                {
                    title: '.git',
                },
                {
                    title: 'node_modules',
                },
                {
                    title: 'public',
                    children: [
                        {
                            title: 'static',
                            children: [
                                {
                                title: 'logo.png',
                                filetype: 'png',
                                },
                            ],
                        },
                        {
                        title: 'favicon.ico',
                        filetype: 'png',
                        },
                        {
                        title: 'index.html',
                        filetype: 'html',
                        },
                    ],
                },
                {
                title: '.gitignore',
                filetype: 'txt',
                },
                {
                title: 'babel.config.js',
                filetype: 'js',
                },
                {
                title: 'package.json',
                filetype: 'json',
                },
                {
                title: 'README.md',
                filetype: 'md',
                },
                {
                title: 'vue.config.js',
                filetype: 'js',
                },
                {
                title: 'yarn.lock',
                filetype: 'txt',
                },
            ],
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