import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUserProfile, clearProfileError } from '../../redux/slices/userSlice';
import './profile.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }

    return () => {
      dispatch(clearProfileError());
    };
  }, [dispatch, token]);

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (isLoading || !profile) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Username:</strong> {profile.userName}</p>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
  );
};

export default Profile;
