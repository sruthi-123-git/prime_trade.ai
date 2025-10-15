import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data))
      .catch(() => alert('Failed to load profile'));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Profile</h2>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
}

export default Profile;
