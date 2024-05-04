import Box from '@mui/material/Box';
import React from 'react';
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import client from '~/utils/thirdWebClient';
import GateFiBuy from './GateFiBuy';

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];

export default function Wallet() {
  return (
    <div>
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <ConnectButton client={client} wallets={wallets} />
      </Box>
      <Box sx={{ textAlign: 'center', p: 1 }}>
        <GateFiBuy
          environment="sandbox"
          amount="100.00"
          crypto="ETH"
          fiat="USD"
          partnerAccountId="123"
          paymentMethod="APPLEPAY"
          redirectUrl="http://localhost:3000"
          region="AU"
        />
      </Box>
    </div>
  );
}
