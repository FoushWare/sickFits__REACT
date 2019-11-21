import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => console.log(payload) || props.children(payload)}
  </Query>
);
User.prototype = {
  // assure the children pass function
  children: PropTypes.func.isRequired,
};
export default User;
export { CURRENT_USER_QUERY };
