
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
