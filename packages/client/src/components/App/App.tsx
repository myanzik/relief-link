import React, { FC, useEffect, useState } from 'react';
// import { Dictionary } from '@nest-react/domain';
import { API_URL } from '~/config';
import { Logger, checkServerVersion } from '~/utils';
import LoginButton from '../LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useActiveAccount } from 'thirdweb/react';

import WorldCoinSignIn from '../WorldCoinSignIn';
import Wallet from '../Wallet';
import GateFiBuy from '../GateFiBuy';
import SetLocation from '../SetLocation';
import ProfilePicture from '../header/ProfilePicture';
import Logo from '../header/Logo';

import Box from '@mui/material/Box';
import ResponsiveAppBar from '../header/ResponsiveAppBar';

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

  // const dictExample: Dictionary<number> = {
  //   first: 1,
  //   second: 2,
  // };
  return (
    <>
      <Box>
        <ResponsiveAppBar />
        <header>
          <LoginButton />
        </header>
        <div>
          {isAuthenticated && <WorldCoinSignIn />}

          {isAuthenticated && <Wallet />}
        </div>
      </Box>
      <div>
        {activeAccount && <SetLocation />}
        {activeAccount && (
          <GateFiBuy
            apiKey="123"
            environment="sandbox"
            amount="100.00"
            crypto="C98"
            fiat="USD"
            partnerAccountId="123"
            paymentMethod="APPLEPAY"
            redirectUrl="http://localhost:3000"
            region="AU"
            walletAddress={activeAccount.address}
          />
        )}
      </div>
    </>
  );
};
