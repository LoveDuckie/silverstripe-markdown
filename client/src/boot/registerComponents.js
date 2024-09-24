import Injector from 'lib/Injector';
import MarkdownEditorComponent from 'components/MarkdownEditorComponent/MarkdownEditorComponent';

export default () => {
  Injector.component.registerMany({
    MarkdownEditorComponent
  });
};
