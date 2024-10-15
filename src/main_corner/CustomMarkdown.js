import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';

class CustomMarkdownProcessor extends Markdown {
    constructor(editor) {
        super(editor);
        this._overrideMarkdownProcessing();
    }

    _overrideMarkdownProcessing() {
        const dataProcessor = this.editor.data.processor;

        if (dataProcessor.toMarkdown) {
            // 保留原始的 toMarkdown 方法作為基礎
            const originalToMarkdown = dataProcessor.toMarkdown;

            // 覆蓋方法
            dataProcessor.toMarkdown = (viewElement) => {
                if (viewElement.is('element', 'table')) {
                    // 遇到 <table> 標籤時，保留 HTML 原樣
                    return viewElement.getOuterHtml();
                }
                // 使用原來的方法處理其他元素
                return originalToMarkdown.call(dataProcessor, viewElement);
            };
        }
    }
}

export default CustomMarkdownProcessor;
