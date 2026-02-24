import React from 'react';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/user/Profile';

function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Dark header banner */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '3rem 0' }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', color: '#888', marginBottom: '0.5rem' }}>Fiók</p>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '0.3rem' }}>
            {currentUser?.nev || 'Profil'}
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: 0 }}>
            Kölcsönzések kezelése, beállítások és statisztikák
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
