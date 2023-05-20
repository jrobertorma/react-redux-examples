import React from 'react';
import './App.css';
import { ReduxCounter } from './ReduxCounter';
import { Provider } from 'react-redux';
import { store } from './store';
import {PostsList} from './PostsList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <ReduxCounter />
        </div>
        <div>
          <PostsList />
        </div>
      </div>
    </Provider>
  );
}

  export default App;
