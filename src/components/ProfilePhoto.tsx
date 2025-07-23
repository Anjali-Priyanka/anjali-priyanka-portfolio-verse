
import React from 'react';

const ProfilePhoto = () => {
  return (
    <div className="relative mx-auto w-48 h-48 mb-8">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
        <img 
          src="/portphoto.jpg" 
          alt="Anjali Priyanka Vechalapu" 
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="absolute inset-0 rounded-full ring-4 ring-primary/10 ring-offset-4"></div>
    </div>
  );
};

export default ProfilePhoto;
