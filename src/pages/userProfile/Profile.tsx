// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.scss';
import { useAuth } from '../../providers/AuthProvider';

interface UserProfile {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.token) {
        setErrorMessage('Unauthorized access. Please log in.');
        return;
      }

      try {
        const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/user', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data;

          const responseUserProfile: UserProfile = {
            userName: user.userName,
            firstName: user.fisrtName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: false,
          };

          setUserProfile(response.data.data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setErrorMessage('Unauthorized access. Please log in.');
        } else {
          setErrorMessage('Failed to load profile information. Please try again later.');
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (errorMessage) {
    return <div className="profile-error">{errorMessage}</div>;
  }

  if (!userProfile) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Username:</strong> {userProfile.userName}</p>
        <p><strong>First Name:</strong> {userProfile.firstName}</p>
        <p><strong>Last Name:</strong> {userProfile.lastName}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Role:</strong> {userProfile.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
  );
};

export default Profile;
