<style>
.ck-editor:not(.ck-comment__input *) {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.ck-editor__main:not(.ck-comment__input *) {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.ck-content * {
  padding: revert ; /* 移除全局的 padding 規則並支援ckeditor Indent */
}
.ck-editor__editable_inline:not(.ck-comment__input *) {
  flex: 1; 
}
.ck-source-editing-area textarea:not(.ck-comment__input *) {
  overflow: auto;
}
</style>
<template>
      <div id="EditorFive" style=" flex: 1; padding: 5px; overflow: auto;">
        <ckeditor
          v-model="editorData"
          :editor="editor"
          :config="editorConfig"
          @ready="onEditorReady"
        ></ckeditor>
      </div>
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
import AddMdTag from './addmdtag/addmdtag';

export default {
  emits: ['editor-ready'], // 宣告自定義事件
    methods: {
      onEditorReady(editor) {
        // 這裡可以觸發一個事件，讓父組件知道編輯器已經準備好
        this.$emit('editor-ready', editor);//這是反向對上層的@editor-ready="handleEditorReady"執行動作並帶入參數
        // // 添加粘貼監聽器，保留表格的 HTML 格式
        // editor.plugins.get('ClipboardPipeline').on('inputTransformation', (evt, data) => {
        // console.log('past event');
        // const viewFragment = data.content;
        // const domConverter = editor.editing.view.domConverter; // 獲取 CKEditor 的 DOM 轉換器

        // // 遍歷粘貼內容的子節點
        // for (const viewChild of viewFragment.getChildren()) {
        //     if (viewChild.is('element', 'table')) {
        //         // 將 viewChild 轉換為 DOM 元素
        //         const domElement = domConverter.viewToDom(viewChild, document);
                
        //         // 獲取轉換後的 HTML
        //         const tableHtml = domElement.outerHTML;

        //         // 將 HTML 轉換回 CKEditor 的 View 片段
        //         const newViewFragment = editor.data.processor.toView(tableHtml);

        //         // 更新 data.content 以使用新的 View 片段
        //         data.content = newViewFragment;
        //         break;
        //     }
        // }
        // });
      },
    },
    name: 'EditorFive',
    components: {
        Ckeditor
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
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
                AddMdTag
            ],
            toolbar: {
              items: [
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
                'showBlocks', 'htmlEmbed',
                '|',
                'addMdTag'],
                shouldNotGroupWhenFull: false/*工具列超過換行還是變成...*/ 
            },
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
                defaultHeadings: {  rows: 1}
            },
            list: {
                properties: {
                    styles: false,
                    startIndex: true
                }
            },
            codeBlock: {
              languages: [
                { language: 'plaintext', label: 'Plain text' },
                { language: 'c', label: 'C' },
                { language: 'mermaid', label: 'Mermaid' },
                { language: 'html', label: 'HTML' },
                { language: 'csharp', label: 'C#' },
                { language: 'css', label: 'CSS' },
                { language: 'html', label: 'HTML' },
                { language: 'java', label: 'Java' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'php', label: 'PHP' },
                { language: 'python', label: 'Python' },
                { language: 'typescript', label: 'TypeScript' },
                { language: 'xml', label: 'XML' }
                // 加你想要的其他語言
              ]
            },
            }
        };
    }
};
</script>