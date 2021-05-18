/* eslint-disable react-hooks/rules-of-hooks */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import 'react-toastify/dist/ReactToastify.css';
// SignUp Mutation
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const CheckEmailStyle = styled.p`
  background: #4cd964;
  color: white;
`;

export default function RequestReset() {
  //   const notify = () => toast('Wow so easy!');
  // use Form hook to handle inputs changes and form reset and clearform
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
  });

  // use the signup mutation
  const [RequestResetFunc, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        // Send the mail,name,password to the backend [Graphql api keystones]
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await RequestResetFunc().catch(console.error);
        console.log(res);
        resetForm();
        // if (data?.createUser) {
        //   const message = `
        //    You can Signe In with ${data.createUser.email} - Please Go Head and Sign in!`;
        //   console.log(message);
        //   // Notification
        //   toast.success(message, {
        //     position: toast.POSITION.TOP_CENTER,
        //     bodyClassName: 'grow-font-size',
        //     progressClassName: 'fancy-progress-bar',
        //   });
        // }
      }}
    >
      {/* Toast notification to told the user that the sigup is ok and can signin */}
      {/* <ToastContainer autoClose={8000} /> */}

      <h2>Request a password Rest</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <CheckEmailStyle>
            success! Check your email for a link!
          </CheckEmailStyle>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Rest!</button>
      </fieldset>
    </Form>
  );
}
