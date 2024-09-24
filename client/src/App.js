// my-module/client/src/App.js
import React from 'react';
import MarkdownEditorComponent from './components/MarkdownEditorComponent/MarkdownEditorComponent';

const App = (props) => (
  <div id="bootstrapped_markdown_editor_component">
    <MarkdownEditorComponent
      textArea={props.textArea}
      toolbar={props.toolbar}
      identifier={props.editorDataConfig.identifier}/>
  </div>
);

export default App;
