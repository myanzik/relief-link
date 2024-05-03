import React, { useState } from 'react';

const DEFAULT_SIGNATURE =
  '2b6b6c58d175ec6bd13c92a17d262fce9336fe1bb41fc1bae0753927c0bbcf2d';

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
  // The user wallet address the crypto will be sent to. If a wallet address is passed, then the step with entering the walletAddress is skipped. If a wallet address is not passed, then the step with entering the walletAddress is shown to the user.
  walletAddress: string;
  // A signature is a digital authentication which is used to verify the identity of the requester. Specify the signature in the header parameter called signature.
  signature?: string;
  // If you want to further customize the language of the widget, you can append the following parameters to the redirected address:
  redirectLang?: string;
}

function setEnvironment(environment: GateFiBuyProps['environment']) {
  switch (environment) {
    case 'production':
      'https://api.gatefi.com/onramp/v1/buy';
    case 'sandbox':
      'https://api-sandbox.gatefi.com/onramp/v1/buy';
    case 'mock-server':
      'https://mock-server.gatefi.com/onramp/v1/buy';
    default:
      'https://api-sandbox.gatefi.com/onramp/v1/buy';
  }
}

function randomOrderId() {
  return Math.random().toString(36).substring(2, 15);
}

export default function GateFiBuy(props: GateFiBuyProps) {
  const [error, setError] = useState('');
  const signature = props.signature ?? DEFAULT_SIGNATURE;
  // A client-defined randomly generated 64-character string used to retrieve the order in case the redirection goes wrong. Used characters: lower case (a-z), upper case (A-Z) and digits (0-9). This parameter is used only if the orderCustomId parameter is enabled in the Retrieve the full platform configuration endpoint.
  const orderCustomId = randomOrderId();
  const url = setEnvironment(props.environment);

  const handleClick = () => {
    const options = {
      method: 'GET',
      headers: {
        signature,
        Accept: 'application/json',
        'api-key': props.apiKey,
      },
    };
    const query = new URLSearchParams({
      amount: props.amount,
      crypto: props.crypto,
      fiat: props.fiat,
      partnerAccountId: props.partnerAccountId,
      paymentMethod: props.paymentMethod,
      redirectUrl: props.redirectUrl,
      region: props.region,
      walletAddress: props.walletAddress,
      orderCustomId,
      ...(props.cancelUrl && { cancelUrl: props.cancelUrl }),
      ...(props.declineUrl && { declineUrl: props.declineUrl }),
    }).toString();

    fetch(`${url}?${query}`, options)
      .then(response => {
        if (response.status !== 303) {
          setError(`Error: ${response.status}`);
          return;
        }
        const location = response.headers.get('Location');
        if (!location) {
          setError('Error: No location header');
          return;
        }
        window.location.assign(location);
        return;
      })
      .catch(error => {
        setError(`Error: ${error}`);
      });
  };

  return (
    <>
      {error}
      <button onClick={handleClick}>GateFi Buy</button>
    </>
  );
}
