import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const googleAPIKey = 'AIzaSyA4sRpbJ-CMvDKXVPBrzen9MFts74wdXGE';

function useRoles(): string[] {
  const { user } = useAuth0();
  if (!user) {
    return [];
  }
  console.log(user);
  return user['https://reliefchain.xyz/roles'];
}

export default function SetLocation() {
  const roles = useRoles();

  // TODO: save the address and ask for a radius if the user is a relief worker
  return (
    <div>
      <h1>Set Location</h1>
      <p>Set your residential address</p>
      <Autocomplete
        apiKey={googleAPIKey}
        options={{
          types: ['premise', 'subpremise', 'room'],
          fields: ['address_components', 'geometry'],
        }}
      />
      {roles.includes('relief-worker') && (
        <>
          <p>Set the radius of your work area</p>
          <input type="number" placeholder="Radius in meters" />
        </>
      )}
      {roles.includes('Funder') && (
        <>
          <p>You are a funder we don't need your address</p>
          <input type="number" placeholder="Radius in meters" />
        </>
      )}
    </div>
  );
}
