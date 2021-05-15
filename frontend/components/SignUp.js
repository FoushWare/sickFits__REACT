/* eslint-disable react-hooks/rules-of-hooks */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import 'react-toastify/dist/ReactToastify.css';
// SignUp Mutation
const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      __typename
    }
  }
`;

export default function signup() {
  //   const notify = () => toast('Wow so easy!');
  // use Form hook to handle inputs changes and form reset and clearform
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  // use the signup mutation
  const [SignUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        // Send the mail,name,password to the backend [Graphql api keystones]
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await SignUp().catch(console.error);
        console.log(res);
        resetForm();
        if (data?.createUser) {
          const message = `
           You can Signe In with ${data.createUser.email} - Please Go Head and Sign in!`;
          console.log(message);
          // Notification
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            bodyClassName: 'grow-font-size',
            progressClassName: 'fancy-progress-bar',
          });
        }
      }}
    >
      {/* Toast notification to told the user that the sigup is ok and can signin */}
      <ToastContainer autoClose={8000} />

      <h2>Sign Up For an Account</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed UP with {data.createUser.email} - Please Go Head and Sign in!
          </p>
        )}
        <label htmlFor="Name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sing Up!</button>
      </fieldset>
    </Form>
  );
}
