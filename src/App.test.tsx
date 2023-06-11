import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from './app/store';
import App from './App';

test('renders App component with Provider and store', () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'root');
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  expect(store.getState().canvas).toBeDefined();
});