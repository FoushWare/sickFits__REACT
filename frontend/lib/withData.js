import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        // credentials: 'include',

        fetchOptions: {
          credentials: 'include',
        },
        connectToDevTools: true,
        headers,
      });
    },
  });
}

export default withApollo(createClient);
