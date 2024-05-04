import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '~/permissions/permissions.guard';
import { Permissions } from '~/permissions/permissions.decorator';

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
}
