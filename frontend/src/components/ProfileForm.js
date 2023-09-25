import React, { useState } from 'react';

const ProfileForm = ({ handleProfileSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    alternateMobile: '',
    residentialAddress: '',
    officeAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the parent component (Profile) for further processing
    handleProfileSubmit(formData);
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h2>Gender : </h2>
          <div>
            <label>Gender:</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="others"
              name="gender"
              value="Others"
              checked={formData.gender === 'Others'}
              onChange={handleChange}
            />
            <label htmlFor="others">Others</label>
          </div>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="alternateMobile">Alternate Mobile Number:</label>
          <input
            type="text"
            id="alternateMobile"
            name="alternateMobile"
            value={formData.alternateMobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="residentialAddress">Residential Address:</label>
          <textarea
            id="residentialAddress"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="officeAddress">Office Address:</label>
          <textarea
            id="officeAddress"
            name="officeAddress"
            value={formData.officeAddress}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
