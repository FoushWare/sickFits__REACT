import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      # authenticatedItem can return maney things [Union: different datatypes] so we use ... on
      ... on User {
        id
        email
        name
        # TODO: Query the cart once we have it
      }
    }
  }
`;

export function useUser() {
  // without default i'll use it as hook
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem; // ? => will return undefined if there is no data
}
