/* eslint-disable no-undef */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  # Union is used as return type so we will use the fragment  [it's instead of if success else ]
  mutation SIGIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        __typename
        item {
          id
          name
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        __typename
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  // handle the inputs and the changing in it's state with the Form hook
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  // Execute the mutation of signin and refetching the user data with the User Hook
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // User [nextjs/router] to go to the products page if success
  const router = useRouter();

  // send the form  [email , password] to the backend Api
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    // Trigger the sigin Mutation
    const res = await signin();
    console.log(res);
    resetForm();
    // Route to the products page
    router.push('/');
  };

  // Error when the auth failed
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Yout Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Email
          <input
            type="password"
            name="password"
            placeholder="Yout password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
