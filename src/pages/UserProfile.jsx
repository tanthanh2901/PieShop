import React, { useContext, useEffect, useState } from 'react';
import { updateUserInfoApi } from '../api/UserApi';
import {UserInfoContext} from '../context/UserInfoContext';
const UserProfile = () => {

  const [user, setUser] = useState({
    email: '',
    username: '',
    shipName: '',
    shipAddress: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
  });

  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await updateUserInfoApi(user); // Send updated user data to the API
      if (response.status >= 200 && response.status < 300) {
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    console.log('Profile updated', user);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow p-6 bg-white rounded-lg shadow-lg">
        <div className="">
          <div className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username || ''} // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Username"
                  readOnly 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Email address"
                  readOnly 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Last name"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="shipAddress"
                  value={user.shipAddress || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Address"
                />
              </div>                         
              <div>
                <label className="block text-sm font-medium">Contact name</label>
                <input
                  name="shipName"
                  value={user.shipName || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={user.phoneNumber || ''}  // Ensuring no undefined value
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                  placeholder="Phone number"
                />
              </div>           
            </div>
            <div className="text-right mt-6">
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
