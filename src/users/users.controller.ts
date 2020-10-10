import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateValidationPipe } from './pipes/user_update.validation.pipe';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('/me')
    @UseGuards(AuthGuard())
    user(@Req() req){
        const user = req.user
        return this.usersService.getUser({id: user.id})
    }

    @Put('')
    @UseGuards(AuthGuard())
    updateUser(@Body(new UserUpdateValidationPipe()) data, @Req() req){
        const user = req.user
        return this.usersService.updateUser({id: user.id}, data)
    }
}
