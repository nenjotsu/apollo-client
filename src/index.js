import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';
import { signOut } from './components/SignOut';
import { getCookie } from './helpers/cookie';

import 'antd/dist/antd.css';

const domain = process.env.REACT_APP_NODE_ENV === 'production' ? 'nenjovalente.com' : 'localhost';

const httpLink = new HttpLink({
  uri: `http://${domain}:8000/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${domain}:8000/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getCookie('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'UNAUTHENTICATED') {
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
