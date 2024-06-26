import Injector from 'lib/Injector';
import MarkdownEditorComponent from 'components/MarkdownEditorComponent/MarkdownEditorComponent';

export default () => {
  Injector.component.registerMany({
    // List your React components here so Injector is aware of them
    MarkdownEditorComponent
  });
};
