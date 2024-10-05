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
      <div id="EditorFive" style=" flex: 1; padding: 5px; ">
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
export default {
    methods: {
      onEditorReady(editor) {
        // 這裡可以觸發一個事件，讓父組件知道編輯器已經準備好
        this.$emit('editor-ready', editor);//這是反向對上層的@editor-ready="handleEditorReady"執行動作並帶入參數
      },
    },
    name: 'EditorFive',
    components: {
        Ckeditor
    },
    data() {
        return {
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
            }
        };
    }
};
</script>