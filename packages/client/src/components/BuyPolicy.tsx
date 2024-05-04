// React component to Make a payment to a smart contract and purchase an insurance policy on our address
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { prepareContractCall } from 'thirdweb';
import { useActiveAccount, TransactionButton } from 'thirdweb/react';
import { AppContext } from '~/AppContext';

const ADDRESS = '0xA7Fb04Fe07e1436295c29718567B6946e9045A22';

export default function BuyPolicy() {
  const activeAccount = useActiveAccount();
  const { place } = useContext(AppContext);
  const { isAuthenticated } = useAuth0();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const buyPolicy = async () => {
    setLoading(true);
    setError('');
  };

  if (!place || !activeAccount || !isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        Please complete all previous steps to buy a policy
      </Box>
    );
  }

  const lat = place.geometry?.location?.lat().toString() ?? '';
  const lng = place.geometry?.location?.lng().toString() ?? '';

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <TransactionButton
        transaction={() => {
          const tx = prepareContractCall({
            contract: ADDRESS,
            method: 'buyPolicy',
            params: [lat, lng] as string[],
          } as any);
          return tx;
        }}
        onTransactionSent={result => {
          console.log('Transaction submitted', result.transactionHash);
        }}
        onTransactionConfirmed={receipt => {
          console.log('Transaction confirmed', receipt.transactionHash);
        }}
        onError={error => {
          console.error('Transaction error', error);
        }}
      >
        Claim an Insurance Policy (Free for the first 1000 users!)
      </TransactionButton>
    </Box>
  );
}
