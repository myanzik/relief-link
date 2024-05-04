import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import React from 'react';
import { API_URL } from '~/config';

// NOTE: We are using worldcoin staging here so we don't use real phones or real accounts
function WorldCoinSignIn() {
  // TODO: Calls your implemented server route
  const verifyProof = async (proof: ISuccessResult) => {
    const response = await fetch(`${API_URL}/account/worldcoin-proof`, {
      method: 'POST',
      body: JSON.stringify({ proof }),
    });
    // TODO: Handle error or do something with response
    await response.json();
  };

  // Let user move to next onboarding step
  const onSuccess = () => {
    console.log('Success');
  };

  return (
    <IDKitWidget
      app_id="app_staging_3ebb58fa5956550d8927e7813ef0dfb7"
      action="signup"
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
}

export default WorldCoinSignIn;
