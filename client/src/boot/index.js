/* global window */
import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';
import { ApolloProvider } from '@apollo/client';
import Injector, { provideInjector } from 'lib/Injector';
import registerComponents from 'boot/registerComponents';

import App from 'App';

registerComponents();

Injector.ready(() => {
  // const ss = typeof window.ss !== 'undefined' ? window.ss : {};
  const { apolloClient, store } = window.ss;
  const AppWithInjector = provideInjector(App);

  $('.js-markdown-container:visible').entwine({
    ReactRoot: null,

    onmatch() {
      this._super();
      this.refresh();
    },

    onunmatch() {
      this._super();
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },

    refresh() {
      const textArea = $(this).parent().find('textarea')[0];
      const editorDataConfig = JSON.parse(textArea.dataset.config);
      const toolbar = window.ss.markdownConfigs.readToolbarConfigs(
        editorDataConfig.toolbar
      );

      const root = createRoot(this[0]);
      this.setReactRoot(root);
      root.render(
        <ApolloProvider client={apolloClient} store={store}>
          <AppWithInjector
            textArea={textArea}
            editorDataConfig={editorDataConfig}
            toolbar={toolbar}
          />
        </ApolloProvider>
      );
    },
  });
});
