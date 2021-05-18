import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Error from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from './styles/Form';

//*  TODO: mutation for changing the user password
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
      __typename
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  console.log(`Error is : ${error}`, successfulError);
  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        const res = await reset().catch(console.error);
        console.log(res);
        console.log({ data, error, loading });
        resetForm();
      }}
    >
      <h2>Reset Your password</h2>
      {/* TODO: Show the error if exists       */}
      <Error error={error || successfulError} />

      {/** TODO: */}
      {/* inform the User : IF the operation sucess  */}
      {data?.redeemUserPasswordResetToken === null && (
        <p>Success! You can Now sign in</p>
      )}

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="Email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New password go Here"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
