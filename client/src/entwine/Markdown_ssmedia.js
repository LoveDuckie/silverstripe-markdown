/* global jQuery */
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { provideInjector } from 'lib/Injector';
const InjectableInsertEmbedModal = window.InsertEmbedModal ? provideInjector(window.InsertEmbedModal.default) : null;

(function ($) {
  $(document).ready(() => {
    // your code here.
  });
}(jQuery));
