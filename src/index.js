import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import {saveState} from './services/StorageService.ts';
import getDebouncedFunction from './utils/debounce'
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
const debouncedSaveState = getDebouncedFunction(() => {
  console.log("Saving State...");
  saveState(store.getState());
}, 3000)

store.subscribe(() => {
  debouncedSaveState();
})

window.onbeforeunload = () => {
  saveState(store.getState());
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
