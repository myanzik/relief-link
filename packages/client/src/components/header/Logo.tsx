import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo image of hands holding the blockchain"
          style={{ width: '100px', height: 'auto' }}
        />
      </Link>
    </div>
  );
};

export default Logo;
