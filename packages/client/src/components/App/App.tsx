import React, { FC, useEffect, useState } from 'react';
import { API_URL } from '~/config';
import { Logger, checkServerVersion } from '~/utils';
import LoginButton from '../LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useActiveAccount } from 'thirdweb/react';

import WorldCoinSignIn from '../WorldCoinSignIn';
import Wallet from '../Wallet';
import GateFiBuy from '../GateFiBuy';
import SetLocation from '../SetLocation';

import Box from '@mui/material/Box';
import ResponsiveAppBar from '../header/ResponsiveAppBar';
import OnBoarding from '../OnBoarding';
import Container from '@mui/material/Container';
import Logo from '../header/Logo';
import LargeLogo from '../LargeLogo';
import HeatMap from '../HeatMapImg';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>('NO SERVER RESPONSE');
  const { isAuthenticated } = useAuth0();
  const activeAccount = useActiveAccount();

  useEffect(() => {
    async function fetchResponse(): Promise<void> {
      try {
        const res = await fetch(API_URL);
        const data = await res.text();
        setResponse(data);
      } catch (err) {
        Logger.error(err);
      }
    }

    fetchResponse();
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  return (
    <>
      <Box>
        <header>
          <ResponsiveAppBar />
        </header>
        <Container maxWidth="md">
          <LargeLogo />
        </Container>
        <body>
          <Container maxWidth="md">
            <OnBoarding />
          </Container>
        </body>
        <Box>
          <HeatMap />
        </Box>
      </Box>
    </>
  );
};
