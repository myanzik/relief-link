import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const googleAPIKey = 'AIzaSyA4sRpbJ-CMvDKXVPBrzen9MFts74wdXGE';

export default function SetLocation() {
  const { user } = useAuth0();
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
    </div>
  );
}
