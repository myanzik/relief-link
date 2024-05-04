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
  const { place } = React.useContext(AppContext);
  return (
    <div>
      {place && (
        <span>You're lat/lng is: {place.geometry?.location?.toString()}</span>
      )}
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}
