import AddMdTagEditing from './addmdtagediting';
import AddMdTagUI from './addmdtagui';
import { Plugin } from 'ckeditor5';

export default class AddMdTag extends Plugin {
    static get requires() {
        return [AddMdTagEditing, AddMdTagUI];
    }
}