import React, { useRef, useState } from 'react';
import {
  GateFiDisplayModeEnum,
  GateFiLangEnum,
  GateFiSDK,
} from '@gatefi/js-sdk';
import { useAuth0 } from '@auth0/auth0-react';
import randomBytes from 'randombytes';
import Button from '@mui/material/Button';
import { useActiveAccount } from 'thirdweb/react';

const DEFAULT_SIGNATURE =
  '2b6b6c58d175ec6bd13c92a17d262fce9336fe1bb41fc1bae0753927c0bbcf2d';

const MERCHANT_ID = 'fa23a156-a95e-4706-84c4-f6999006f32c';

// const url = 'https://api-sandbox.gatefi.com/onramp/v1/buy';
// const options = {
//   method: 'GET',
//   headers: {
//     signature:
//       '2b6b6c58d175ec6bd13c92a17d262fce9336fe1bb41fc1bae0753927c0bbcf2d',
//     Accept: 'application/json',
//     'api-key': '123',
//   },
// };

// try {
//   const response = await fetch(url, options);
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
//   console.error(error);
// }

interface GateFiBuyProps {
  // The API key for the GateFi API.
  apiKey: string;
  // environment for the GateFi API. One of
  environment: 'sandbox' | 'production' | 'mock-server';
  // Redirects the user to this url if the purchase is cancelled.
  cancelUrl?: string;
  // Redirects the user to this url if the purchase is declined.
  declineUrl?: string;
  // The amount of fiat currency the user wants to spend to buy crypto. Enclose the float number in double quotes.
  amount: string;
  // The crypto currency the user wants to buy. It needs to be a crypto id defined in the Retrieve the full platform configuration endpoint.
  crypto: string;
  // The fiat currency the user wants to buy crypto with. It needs to be a fiat id defined in the Retrieve the full platform configuration endpoint.
  fiat: string;
  // An ID identifying GateFi and associating subsequent order with it.
  partnerAccountId: string;
  // The payment method the user wants to buy crypto with. It needs to be a payment id defined in the Retrieve the full platform configuration endpoint. Example: APPLEPAY;
  paymentMethod: string;
  // The URL the user will be redirected to after the purchase has been performed in the platform widget.
  redirectUrl: string;
  // The region of the user. Can be a country ID (for example, US) or state ID (for example, US-AL).
  region: string;
  // A signature is a digital authentication which is used to verify the identity of the requester. Specify the signature in the header parameter called signature.
  signature?: string;
  // text for the button
  buttonText?: string;
}

function setEnvironment(environment: GateFiBuyProps['environment']) {
  switch (environment) {
    case 'production':
      return 'https://api.gatefi.com/onramp/v1/buy';
    case 'sandbox':
      return 'https://api-sandbox.gatefi.com/onramp/v1/buy';
    case 'mock-server':
      return 'https://mock-server.gatefi.com/onramp/v1/buy';
    default:
      return 'https://api-sandbox.gatefi.com/onramp/v1/buy';
  }
}

export default function GateFiBuy(props: GateFiBuyProps) {
  const [error, setError] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayInstanceSDK = useRef<GateFiSDK | null>(null);
  const { isAuthenticated, user } = useAuth0();
  const activeAccount = useActiveAccount();

  if (!isAuthenticated) {
    return null;
  }
  const userEmail = user?.email;

  const signature = props.signature ?? DEFAULT_SIGNATURE;
  // A client-defined randomly generated 64-character string used to retrieve the order in case the redirection goes wrong. Used characters: lower case (a-z), upper case (A-Z) and digits (0-9). This parameter is used only if the orderCustomId parameter is enabled in the Retrieve the full platform configuration endpoint.
  const baseUrl = setEnvironment(props.environment);

  const handleOnClick = () => {
    if (overlayInstanceSDK.current) {
      if (isOverlayVisible) {
        overlayInstanceSDK.current.hide();
        setIsOverlayVisible(false);
      } else {
        overlayInstanceSDK.current.show();
        setIsOverlayVisible(true);
      }
    } else {
      const randomString = randomBytes(32).toString('hex');
      overlayInstanceSDK.current = new GateFiSDK({
        merchantId: MERCHANT_ID,
        displayMode: GateFiDisplayModeEnum.Overlay,
        nodeSelector: '#overlay-button',
        lang: GateFiLangEnum.en_US,
        isSandbox: true,
        successUrl: 'https://www.crypto.unlimit.com/',
        walletAddress: activeAccount?.address,
        email: userEmail,
        externalId: randomString,
        defaultFiat: {
          currency: 'USD',
          amount: '20',
        },
        defaultCrypto: {
          currency: 'USDT-BEP20',
        },
      });
    }
    overlayInstanceSDK.current?.show();
    setIsOverlayVisible(true);
  };

  return (
    <>
      {error}
      <Button variant="contained" onClick={handleOnClick}>
        {props.buttonText || 'Buy Crypto'}
      </Button>
      <div id="overlay-button"></div>
    </>
  );
}
