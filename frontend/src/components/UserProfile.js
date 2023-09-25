import React from 'react';

const UserProfile = ({ profileData }) => {
  // console.log(profileData);
  return (
    <div>
      <h2>User Profile</h2>
      {profileData && (
        <div>
          <p><strong>Full Name:</strong> {profileData.fullname}</p>
          <p><strong>Date of Birth:</strong> {profileData.date_of_birth}</p>
          <p><strong>Mobile Number:</strong> {profileData.mobile_number}</p>
          <p><strong>Alternate Mobile Number:</strong> {profileData.alternate_mobile_number}</p>
          <p><strong>Residential Address:</strong> {profileData.residential_address}</p>
          <p><strong>Office Address:</strong> {profileData.office_address}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
