/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from '../components/User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;
export default function signout() {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const res = signout();
  const router = useRouter();

  if (res) {
    router.push('/');
    return null;
  }
  return null;
}
