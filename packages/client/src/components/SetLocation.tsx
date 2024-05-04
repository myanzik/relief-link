import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import React, { useContext } from 'react';
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import { AppContext, AppContextProps } from '~/AppContext';
import { TextField } from '@mui/material';

const googleAPIKey = 'AIzaSyA4sRpbJ-CMvDKXVPBrzen9MFts74wdXGE';

function useRoles(): string[] {
  const { user } = useAuth0();
  if (!user) {
    return [];
  }
  return user['https://reliefchain.xyz/roles'];
}

export default function SetLocation() {
  const roles = useRoles();
  const { setPlace } = useContext<AppContextProps>(AppContext);
  const { ref: materialRef } = usePlacesWidget({
    apiKey: googleAPIKey,
    onPlaceSelected: setPlace,
    options: {
      types: ['premise', 'subpremise', 'room'],
      fields: ['address_components', 'geometry'],
    },
  });

  // TODO: save the address and ask for a radius if the user is a relief worker
  return (
    <div>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Set your residential address</p>
        <TextField inputRef={materialRef} />
        {roles.includes('relief-worker') && (
          <>
            <p>Set the radius of your work area</p>
            <input type="number" placeholder="Radius in meters" />
          </>
        )}
        {roles.includes('Funder') && (
          <>
            <p>You are a funder we do not need your address</p>
            <input type="number" placeholder="Radius in meters" />
          </>
        )}
      </Box>
    </div>
  );
}
