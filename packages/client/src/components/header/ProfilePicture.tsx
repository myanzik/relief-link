import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePicture: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async (): Promise<undefined> => {
      if (isAuthenticated && user) {
        try {
          const name: string = user.nickname || user.name || 'Anonymous';
          setImageUrl(`https://noun-api.com/beta/pfp?name=${name}`);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    fetchProfilePicture();
  }, [isAuthenticated, user]);

  return (
    <div>
      {isAuthenticated && user && (
        <>{imageUrl && <img src={imageUrl} alt="Profile" style={{width: "100%"}} />}</>
      )}
    </div>
  );
};

export default ProfilePicture;
