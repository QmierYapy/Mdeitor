import { Plugin } from 'ckeditor5';

export default class AddMdTagEditing extends Plugin {
    init() {
        console.log('AddMdTagEditing#init() got called');
        this._defineSchema();									// ADDED
        this._defineConverters();							// ADDED
    }
    _defineSchema() {											// ADDED
        const schema = this.editor.model.schema;

        // Extend the text node's schema to accept the abbreviation attribute.
        schema.extend('$text', {
            allowAttributes: ['abbreviation']
        });
    }
    _defineConverters() {									// ADDED
        const conversion = this.editor.conversion;

        // Conversion from a model attribute to a view element.
        conversion.for('downcast').attributeToElement({
            model: 'abbreviation',
            // Callback function provides access to the model attribute value
            // and the DowncastWriter.
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;

                return writer.createAttributeElement('abbr', {
                    title: modelAttributeValue
                });
            }
        });
        // Conversion from a view element to a model attribute.
        conversion.for('upcast').elementToAttribute({
            view: {
                name: 'abbr',
                attributes: ['title']
            },
            model: {
                key: 'abbreviation',
                // Callback function provides access to the view element.
                value: viewElement => {
                    const title = viewElement.getAttribute('title');

                    return title;
                }
            }
        });

    }
}