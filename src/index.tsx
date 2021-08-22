import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import global_en from './translations/en/global.json'
import global_es from './translations/es/global.json'
import global_zh from './translations/zh/global.json'
import './index.css';

i18next.init({
  interpolation: {escapeValue:false},
  lng: "en",
  resources: {
    en: {
      global: global_en
    },
    es: {
      global: global_es
    },
    zh: {
      global: global_zh
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider  i18n={i18next}>
    <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
