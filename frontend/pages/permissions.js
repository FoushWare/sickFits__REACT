import PleaseSignIn from '../components/PleaseSigIn';
import Permissions from '../components/Permissions';

const PermissionPage = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);
export default PermissionPage;
