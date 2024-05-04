import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import React from 'react';

// TODO: Implement WorldCoinSignIn component
function WorldCoinSignIn() {
  // TODO: Calls your implemented server route
  const verifyProof = async (proof: ISuccessResult) => {
    throw new Error('TODO: verify proof server route');
  };

  // TODO: Functionality after verifying
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
      {({ open }) => (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Button variant="contained" onClick={open}>
            Verify with World ID
          </Button>
        </Box>
      )}
    </IDKitWidget>
  );
}

export default WorldCoinSignIn;
