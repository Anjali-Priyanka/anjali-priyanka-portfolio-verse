
import React from 'react';
import { User } from 'lucide-react';

const ProfilePhoto = () => {
  return (
    <div className="relative mx-auto w-48 h-48 mb-8">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
        {/* Placeholder for profile photo - user can upload their actual photo */}
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
          <User className="w-20 h-20 text-muted-foreground/40" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-full ring-4 ring-primary/10 ring-offset-4"></div>
    </div>
  );
};

export default ProfilePhoto;
