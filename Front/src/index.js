import './index.css';

import * as serviceWorker from './serviceWorker';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from "@apollo/client"

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { onError } from "@apollo/client/link/error"
import { setContext } from '@apollo/client/link/context';
import { store } from './app/store';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (networkError) {
    if ( networkError.statusCode === 401 ) {
      window.location.replace('/login')
      localStorage.removeItem('token')
    }
  }
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const httpLink = from([
  errorLink,
  new HttpLink({ uri: "/graphql" }),
]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
