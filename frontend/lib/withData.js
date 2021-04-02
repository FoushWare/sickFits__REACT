import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint, prodendpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodendpoint,
    request: operation => {
      operation.setContext({
        // credentials: 'include',

        // fetchOptions: {
        //   credentials: 'include',
        //   mode: 'no-cors',
        // },
        connectToDevTools: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
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
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
