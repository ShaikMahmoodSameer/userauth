import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileForm from './ProfileForm';
import UserProfile from './UserProfile';

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [showProfileForm, setShowProfileForm] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/user");
        if (response.data.Status === "ok") {
          setAuth(true);
        } else {
          setAuth(false);
          // If the user is not authenticated, redirect to the login page
          navigate('/login');
        }
        // Fetch the user's profile data if authenticated
        if (auth) {
          const profileResponse = await axios.get(`http://localhost:3500/profile/${userId}`);
          const data = profileResponse.data;
          if (data.profileExists) {
            setProfileData(data.profileData);
          } else {
            setShowProfileForm(true);
          }
        }
      } catch (err) {
        console.error("Axios Error:", err);
      }
    };

    fetchData();
  }, [userId, auth, navigate]);

  // Function to handle form submission when creating a new profile
  const handleProfileSubmit = async (formData) => {
    try {
      // Send the form data to the server to create the user's profile
      const response = await axios.post(`http://localhost:3500/profile/${userId}`, formData);
      // Profile created successfully, update the state
      // console.log(response.data);
      if (response.data.profileAdded) {
        setProfileData(response.data.profileData);
        setShowProfileForm(false);
        window.location.reload();
      } else {
        console.log(response.data.error);
      }
    } catch (err) {
      console.error("Axios error:", err);
    }
  };

  return (
    <div>
      {showProfileForm ? (
        // Render the profile creation form if needed
        <ProfileForm handleProfileSubmit={handleProfileSubmit} />
      ) : (
        auth && profileData && Object.keys(profileData).length > 0 ? (
          // Render the user's profile data if available
          <UserProfile profileData={profileData} />
        ) : null
      )}
    </div>
  );  
};

export default Profile;
