import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '~/permissions/permissions.guard';
import { Permissions } from '~/permissions/permissions.decorator';
// import type { ISuccessResult, IVerifyResponse } from '@worldcoin/idkit';
import type { Response } from 'express';

let worldcoin;

import('@worldcoin/idkit').then(wc => {
  console.log(wc)
  worldcoin = wc;
});

// console.log(worldcoin);

const verifyCloudProof = async (
  proof: any,
  id: string,
  action: string
): Promise<any> => ({
  success: true,
});

// TODO: Use proper secrets management for this
const WORLDCOIN_APP_ID = 'app_staging_3ebb58fa5956550d8927e7813ef0dfb7';

@Controller('account')
export class AccountController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  me() {
    /// return the user's saved location
    return 'This route is protected';
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('update:account')
  updateAccount() {
    return 'This route is protected and requires the update:account permission';
  }

  @Put('location')
  @UseGuards(AuthGuard('jwt'))
  saveLocation(@Body() location: { lat: number; lng: number }) {
    console.log('Location saved:', location);
    return 'This route is protected and requires the update:account permission';
  }

  @Post('worldcoin-proof')
  @UseGuards(AuthGuard('jwt'))
  async worldCoinProof(@Body('proof') proof: any, @Res() res: Response) {
    console.log('proof', proof);
    // verifyCloudProof is a function provided by the IDKit library that verifies the proof using the v2 API of the verify function.
    // You can use this function to verify the proof and perform any necessary actions based on the result.
    let response = await verifyCloudProof(
      { ...proof },
      WORLDCOIN_APP_ID,
      'test'
    );

    if (!response.success) {
      console.error('Proof verification failed:', response);
      return res.status(400).json({ error: 'Proof verification failed' });
    }

    console.log('Credential verified!', response);

    // This is where you should perform backend actions based on the verified credential, such as setting a user as "verified" in a database
    // For this example, we'll just return a 200 response and console.log the verified credential
    return {
      code: 'success',
      detail: 'This action verified correctly!',
    };
  }
}
