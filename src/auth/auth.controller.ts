import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginValidationPipe } from './pipes/login.validation.pipe';
import { RegisterValidationPipe } from './pipes/register.validation.pipe';
import { ForgotPasswordValidationPipe } from './pipes/forgot_password.validation.pipe';
import { ChangePasswordValidationPipe } from './pipes/change_password.validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    async register(@Body(new RegisterValidationPipe()) data){
        return this.authService.register(data)
    }

    @Post('/login')
    async login(@Body(new LoginValidationPipe()) data){
        return this.authService.login(data)
    }

    @Post('/forgot_password')
    async forgot_password(@Body(new ForgotPasswordValidationPipe()) data){
        return this.authService.forgot_password(data)
    }

    @Post('/change_password')
    async change_password(@Body(new ChangePasswordValidationPipe()) data){
        return this.authService.change_password(data)
    }
}
