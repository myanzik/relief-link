import Box from '@mui/material/Box';
import React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { TransactionButton } from 'thirdweb/react';
import { createThirdwebClient, prepareContractCall } from 'thirdweb';
import { contract } from './BuyPolicy';
import Alert from '@mui/material/Alert';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 600,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 300,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const HeatMap: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const query = window.location.search.replace('claim=', '');

  return (
    <Box sx={{ textAlign: 'center', p: 1 }}>
      {message && (
        <Box sx={{ p: 2 }}>
          <Alert>{message}</Alert>
        </Box>
      )}
      <ImageButton focusRipple style={{ width: '55rem', maxWidth: '100%' }}>
        <TransactionButton
          style={{}}
          transaction={() => {
            const tx = prepareContractCall({
              contract,
              method: 'claimRelief',
              params: [],
            });
            return tx;
          }}
          onTransactionSent={result => {
            console.log('Transaction submitted', result.transactionHash);
            setMessage('Transaction submitted');
          }}
          onTransactionConfirmed={receipt => {
            console.log('Transaction confirmed', receipt.transactionHash);
            setMessage('Transaction confirmed! We hope you stay safe!');
          }}
          onError={error => {
            console.error('Transaction error', error);
            setMessage(`Transaction error! ${error}`);
          }}
        >
          <ImageSrc style={{ backgroundImage: `url("/heatmap.png")` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: theme => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {query ? (
                <span>Claim Emergency Aid</span>
              ) : (
                <span>Tap your wearable for assistance</span>
              )}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </TransactionButton>
      </ImageButton>
      {/* <img
        src="/heatmap.png"
        alt="heatmap image of the world"
        style={{ width: '55rem', maxWidth: '100%', height: 'auto' }}
      /> */}
    </Box>
  );
};

export default HeatMap;
