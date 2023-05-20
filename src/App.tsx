import React from 'react';
import './App.css';
import { ReduxCounter } from './ReduxCounter';
import { Provider } from 'react-redux';
import { store } from './store';
import {PostsList} from './PostsList';
import {createBrowserRouter, RouterProvider, Outlet, Link} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`/counter`}>Counter</Link>
            </li>
            <li>
              <Link to={`/posts`}>Posts</Link>
            </li>
          </ul>
        </nav>
        <div id="detail">
          <Outlet />
        </div>
      </div>,
    errorElement:
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>,
    children: [
      {
        path: "counter",
        element: <ReduxCounter />
      },
      {
        path: "posts",
        element: <PostsList />
      }
    ]
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <div className="App">
      </div>
    </Provider>
  );
}

  export default App;
