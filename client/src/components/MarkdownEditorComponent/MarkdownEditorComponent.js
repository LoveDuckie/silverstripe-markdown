import React from 'react';

import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import jQuery from 'jquery';
import ShortCodeParser from '../ShortCodeParser/ShortCodeParser';

// const SimpleMDE = require('simplemde');
const EasyMDE = require('easymde');

const parser = new ShortCodeParser();

const ss = typeof window.ss !== 'undefined' ? window.ss : {};

if (typeof ss.markdownConfigs === 'undefined') {
  ss.markdownConfigs = {};
}

ss.markdownConfigs.readToolbarConfigs = function (data) {
  const toolbar = [];
  const dataKeys = Object.keys(data);
  for (let i = 0; i < dataKeys.length; i++) {
    // for (const key in data) {
    const key = dataKeys[i];
    const element = data[key];

    if (typeof element === 'string') {
      toolbar.push(element);
    } else {
      const action = element.action;
      if (typeof EasyMDE[element.action] !== 'undefined') {
        toolbar.push({
          name: element.name,
          action: EasyMDE[element.action],
          className: element.className,
          title: element.title,
        });
      } else if (typeof ss.markdownConfigs[element.action] !== 'undefined') {
        toolbar.push({
          name: element.name,
          action(editor) {
            ss.markdownConfigs[action](editor);
          },
          className: element.className,
          title: element.title,
        });
      }
    }
  }
  return toolbar;
};

parser.registerShortCode('image_link', (buffer, opts) => opts.url);

parser.registerShortCode(
  'embed',
  (buffer, opts) =>
    `<img src="${opts.thumbnail} width="${opts.width} height="${opts.height}">`
);

class MarkdownEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = ss.markdownConfigs;
    this._handleChange = this._handleChange.bind(this);
  }

  previewRender(plainText, preview) {
    preview.classList.add('markdown-preview');
    preview.classList.add(this.identifier);
    const parsedText = parser.parse(plainText);
    return this.parent.markdown(parsedText);
  }

  _handleChange(value) {
    console.log(value);
    console.log(this.props.textArea);
    this.props.textArea.value = value;
  }

  static addCustomAction(key, action) {
    ss.markdownConfigs[key] = action;
  }

  static registerShortCodes(key, callback) {
    if (key == null) {
      throw new Error('Key is null');
    }
    if (callback == null) {
      throw new Error('Callback is null');
    }
  }

  render() {
    return (
      <div className="editor-container">
        <SimpleMdeReact
          value={this.props.textArea.value}
          onChange={this._handleChange}
          options={{
            // autoDownloadFontAwesome: false,
            spellChecker: true,
            dragDrop: false,
            keyMap: 'sublime',
            toolbar: this.props.toolbar,
            previewRender: this.previewRender,
            identifier: this.props.identifier,
          }}
        />
      </div>
    );
  }
}

window.MarkdownEditorField = MarkdownEditorComponent;

jQuery.entwine('ss', ($) => {
  MarkdownEditorComponent.addCustomAction('ssEmbed', (editor) => {
    if (window.InsertMediaModal) {
      let dialog = $('#insert-md-embed-react__dialog-wrapper');
      if (!dialog.length) {
        dialog = $('<div id="insert-md-embed-react__dialog-wrapper" />');
        $('body').append(dialog);
      }
      console.log(dialog);
      console.log(editor);
      dialog.setElement(editor);
      dialog.open();
    } else {
      alert('Media embed is not supported');
    }
  });

  MarkdownEditorComponent.addCustomAction('ssImage', (editor) => {
    if (window.InsertMediaModal) {
      let dialog = $('#insert-md-media-react__dialog-wrapper');
      if (!dialog.length) {
        dialog = $('<div id="insert-md-media-react__dialog-wrapper" />');
        $('body').append(dialog);
      }
      console.log(dialog);
      console.log(editor);
      dialog.setElement(editor);
      dialog.open();
    } else {
      EasyMDE.drawImage(editor);
    }
  });
});

export default MarkdownEditorComponent;
