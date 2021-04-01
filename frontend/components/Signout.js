import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;
const Signout = props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <button onClick={signout}>SignOut</button>}
  </Mutation>
);

export default Signout;
