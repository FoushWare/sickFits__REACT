import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

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
    //  local state data {like public store in}
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // write cart state to the opposite
            const data = { data: { cartOpen: !cartOpen } };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
