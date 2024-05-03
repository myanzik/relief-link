import React from 'react';
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import client from '~/utils/thirdWebClient';

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];

export default function Wallet() {
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}
