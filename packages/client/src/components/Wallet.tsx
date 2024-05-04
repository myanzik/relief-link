import Box from '@mui/material/Box';
import React from 'react';
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { AppContext, AppContextProps } from '~/AppContext';
import client from '~/utils/thirdWebClient';

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];

export default function Wallet() {
  // const { place } = React.useContext(AppContext);
  return (
    <div>
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <ConnectButton client={client} wallets={wallets} />
      </Box>{' '}
    </div>
  );
}
