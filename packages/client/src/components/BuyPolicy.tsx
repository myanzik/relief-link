// React component to Make a payment to a smart contract and purchase an insurance policy on our address
import { useAuth0 } from '@auth0/auth0-react';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import {
  prepareContractCall,
  getContract,
  Chain,
  createThirdwebClient,
} from 'thirdweb';
import { useActiveAccount, TransactionButton } from 'thirdweb/react';
import { AppContext } from '~/AppContext';
import abi from '~/utils/contractABI';

const ADDRESS = '0xA7Fb04Fe07e1436295c29718567B6946e9045A22';

const chain: Chain = {
  id: 84532,
  rpc: 'https://sepolia.base.org/',
};

const client = createThirdwebClient({
  clientId: '714431ba817d002582d77c75e11a9676',
});

const contract = getContract({
  client,
  chain,
  address: ADDRESS,
  abi: [
    {
      inputs: [
        {
          internalType: 'address[]',
          name: '_admins',
          type: 'address[]',
        },
        {
          internalType: 'address',
          name: '_reliefToken',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_apiCallOracle',
          type: 'address',
        },
        {
          internalType: 'uint64',
          name: '_subscriptionId',
          type: 'uint64',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'AccessControlBadConfirmation',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'neededRole',
          type: 'bytes32',
        },
      ],
      name: 'AccessControlUnauthorizedAccount',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
      ],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedInnerCall',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'previousAdminRole',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'newAdminRole',
          type: 'bytes32',
        },
      ],
      name: 'RoleAdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'victim',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'lat',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'lon',
          type: 'string',
        },
      ],
      name: 'addVictim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'apiCallOracle',
      outputs: [
        {
          internalType: 'contract IApiCallOracle',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'lat',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'lon',
          type: 'string',
        },
      ],
      name: 'buyPolicy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'checkHasTriggered',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimRelief',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getReliefAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getReliefPoolBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVictimCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'hasTriggered',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'victim',
          type: 'address',
        },
      ],
      name: 'isValidVictim',
      outputs: [
        {
          internalType: 'bool',
          name: '_isVictim',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes[]',
          name: 'data',
          type: 'bytes[]',
        },
      ],
      name: 'multicall',
      outputs: [
        {
          internalType: 'bytes[]',
          name: 'results',
          type: 'bytes[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'reliefToken',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'callerConfirmation',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'sendReliefToAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'status',
          type: 'bool',
        },
      ],
      name: 'sethasTriggered',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'subscriptionId',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'victimDetails',
      outputs: [
        {
          internalType: 'string',
          name: 'lat',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'lon',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'hasClaimed',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
});

export default function BuyPolicy() {
  const activeAccount = useActiveAccount();
  const { place } = useContext(AppContext);
  const { isAuthenticated } = useAuth0();
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  const buyPolicy = async () => {
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
            contract,
            method: 'buyPolicy',
            params: [lat, lng],
          });
          return tx;
        }}
        onTransactionSent={result => {
          console.log('Transaction submitted', result.transactionHash);
          setMessage('Transaction submitted');
        }}
        onTransactionConfirmed={receipt => {
          console.log('Transaction confirmed', receipt.transactionHash);
          setMessage(
            'Transaction confirmed! Congratulations! We hope nothing bad happens to you.'
          );
        }}
        onError={error => {
          console.error('Transaction error', error);
        }}
      >
        Claim an Insurance Policy (Free for the first 1000 users!)
      </TransactionButton>
      {message && (
        <Box sx={{ p: 2 }}>
          <Alert>{message}</Alert>
        </Box>
      )}
    </Box>
  );
}
