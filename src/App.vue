<style>
.ck-editor:not(.ck-comment__input *) {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
.ck-editor__main:not(.ck-comment__input *) {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}
.ck-editor__editable_inline:not(.ck-comment__input *) {
  flex: 1; 
}
</style>
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
    
    <v-alert
                v-model="alert.flag"
                dark
                :color="alert.color"
                border="top"
                transition="slide-y-transition"                
                density="compact"
                :icon="alert.icon"
                >
                {{alert.text}}</v-alert>
    <v-btn class="mx-auto" variant="text" @click="print('footer')">
        save
      </v-btn>
    <v-btn class="mx-auto" variant="text" @click="hide_alert('show','red','mdi-home',1000)">
        Show alert? {{alert.flag}}
      </v-btn>
    </v-app-bar>
    
    <v-main style="display: flex; height: 100vh; margin: 0;">
      <div id="EditorFive" style=" flex: 1; padding: 5px; ">
        <ckeditor
          v-model="editorData"
          :editor="editor"
          :config="editorConfig"
          @ready="onEditorReady"
        ></ckeditor>
      </div>
    </v-main>

  </v-layout>
</template>

<script>
import { 
    SourceEditing,
    Markdown,
    Autoformat,
    PasteFromMarkdownExperimental,
    ClassicEditor,
    Essentials, 
    Heading,
    Bold, 
    Italic, 
    Underline,
    Strikethrough,
    Code,
    Subscript,
    Superscript,
    Font, 
    Paragraph,
    List,
    ListProperties,
    TodoList,
    CodeBlock,
    BlockQuote,
    Highlight,
    Indent, 
    IndentBlock,
    RemoveFormat,
    Clipboard,
    HorizontalLine,
    Table,
    TableToolbar,
    TableCaption,
    BlockToolbar,
    ShowBlocks,
    Link, 
    AutoLink,
    FindAndReplace,
    HtmlEmbed,
} from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
export default {
    methods: {
      print() {
        //alert(JSON.stringify(this.$refs.app.getLayoutItem(key), null, 2))
        this.editorInstance.setData('# test');
        console.log('alart true')
        this.hide_alert('save success','green','mdi-content-save',2000)
      },
      onEditorReady(editor) {
        this.editorInstance = editor; // 存储在组件中
        window.editor = editor; // 将编辑器实例挂载到全局对象
      },
      setEditorData(data) {
        if (this.editorInstance) {
          this.editorInstance.setData(data); // 使用编辑器实例的 setData() 方法
        } else {
          // 如果编辑器尚未准备就绪，可以选择在 editorData 上直接设置
          this.editorData = data;
        }
      },
      hide_alert(text,color,icon,time) {
        console.log('alart')
        this.alert.flag = true;
        this.alert.text=text;
        this.alert.color=color;
        this.alert.icon=icon;
        window.setTimeout(() => {
          this.alert.flag = false;
          console.log("hide alert after 3 seconds");
        }, time)    
      }
    },
    name: 'EditorFive',
    components: {
        Ckeditor
    },
    data() {
        return {          
            alert: {flag : false,text:'',color:'red',icon:''},            
            editor: ClassicEditor,
            editorData: '<p>Hello from CKEditor 5 in Vue!</p>',
            editorConfig: {
                  plugins: [ 
                SourceEditing,
                Markdown,
                Autoformat,
                PasteFromMarkdownExperimental,
                Essentials, 
                Heading,
                Bold, 
                Italic,
                Underline,
                Strikethrough,
                Code,
                Subscript,
                Superscript,
                Font, 
                Paragraph,            
                ListProperties,
                List,
                TodoList,
                CodeBlock,
                BlockQuote,
                Highlight,
                Indent, 
                IndentBlock,
                RemoveFormat,
                HorizontalLine,
                Table,
                TableToolbar,
                TableCaption,
                Clipboard,
                BlockToolbar,
                ShowBlocks,
                Link, 
                AutoLink,
                FindAndReplace,
                HtmlEmbed,
            ],
            toolbar: [
                'undo', 'redo', 'findAndReplace',
                '|', 
                'sourceEditing',
                '|', 
                'heading',
                '|',
                'bold', 'italic', 'strikethrough', 'code',  'blockquote','removeFormat', 'highlight',
                '|',
                'bulletedList', 'numberedList', 'todoList', 
                '|',
                'link', 'insertTable' , 'codeBlock','horizontalLine',
                '|',
                'outdent', 'indent', 
                '|',
                'showBlocks', 'htmlEmbed'
            ],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                    {
                        model: 'headingFancy',
                        view: {
                            name: 'h2',
                            classes: 'fancy'
                        },
                        title: 'Heading 2 (fancy)',
                        class: 'ck-heading_heading2_fancy',
                        converterPriority: 'high'
                    }
                ]
            },            
            table: {
                contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ],
                defaultHeadings: {}
            },
            list: {
                properties: {
                    styles: false,
                    startIndex: true
                }
            },
            editorInstance: null // 新增一個屬性來存儲編輯器實例
            }
        };
    }
};
</script>