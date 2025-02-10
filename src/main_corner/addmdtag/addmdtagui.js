import { ButtonView, Plugin } from 'ckeditor5';

export default class AddMdTagUI extends Plugin {
    init() {
        console.log('AddMdTagUI#init() got called');
        const editor = this.editor;
        editor.ui.componentFactory.add('addmdtag', () => {
            const button = new ButtonView();

            button.label = 'Add Md Tag';
            button.tooltip = true;
            button.withText = true;

            this.listenTo(button, 'execute', () => {
                // const selection = editor.model.document.selection;
                const title = 'What You See Is What You Get';
                const abbr = 'WYSIWYG';

                // Change the model to insert the abbreviation.
                editor.model.change(writer => {
                    editor.model.insertContent(
                        // Create a text node with the abbreviation attribute.
                        writer.createText(abbr, { abbreviation: title })
                    );
                });
            });

            return button;
        });
    }
}