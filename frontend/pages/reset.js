import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log(query);
  // check if the token sent within the URL
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  // provide the token to the Reset Component [token here is like Backend-password to reset your password]
  return <Reset token={query?.token} />;
}
