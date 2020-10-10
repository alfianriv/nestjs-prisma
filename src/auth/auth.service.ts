import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HandleService } from 'src/helper/handle/handle.service';
import { HashService } from 'src/helper/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { usersCreateInput } from '@prisma/client';
import * as moment from 'moment'
import {v1 as uuid} from 'uuid'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private handle: HandleService,
        private hash: HashService,
        private jwt: JwtService
    ) { }

    async validate(payload){
        const user = await this.prisma.users.findOne({select: { id: true }, where: {id: payload.id}})    
        if (!user) {
            throw new UnauthorizedException(['Unauthorized'])    
        }    
        return user;  
    }

    async isFound(email){
        try {
            const user = await this.prisma.users.findOne({where: {email: email}})    
            return user
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async register(data: usersCreateInput) {
        try {
            const isFound = await this.isFound(data.email)
            if(isFound){
                throw new BadRequestException(['Email already registered']);
            }
            data.password = this.hash.crypt(data.password)
            const user = await this.prisma.users.create({ data })
            delete user.password
            return this.handle.response(200, "Success", {
                message: "Success register user",
                data: user
            })
        } catch (error) {
            throw error
        }
    }

    async login(data: { email: string, password: string }) {
        try {
            const { email, password } = data
            const user = await this.isFound(email)
            if(!user){
                throw new NotFoundException(["Email not registered"])
            }
            if(!this.hash.compare(password, user.password)){
                throw new UnauthorizedException(["User and Password not match"]);
            }
            delete user.password
            const token =  this.jwt.sign(user)
            return this.handle.response(200, "Success", {user: user, token})
        } catch (error) {
            throw error
        }
    }

    async forgot_password(data: {email: string}){
        try {
            const { email } = data
            const user = await this.isFound(email)
            if(!user){
                throw new NotFoundException(["Email not registered"])
            }
            const expire_time = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
            await this.prisma.users.update({
                where: {id: user.id},
                data: {
                    forgot_password_exp: new Date(expire_time),
                    forgot_password_code: uuid().replace(/-/g, '')
                }, 
            })
            return this.handle.response(200, "Please check your email to change your password", {})
        } catch (error) {
            throw error
        }
    }
    
    async change_password(data: {code: string, password: string}){
        try {
            const {code, password} = data
            const user = await this.prisma.users.findFirst({
                select: {
                    id: true,
                    forgot_password_exp: true,
                },
                where: {forgot_password_code: code}
            })
            if(!user){
                throw new BadRequestException(['Reset password is not valid'])
            }
            if(moment(user.forgot_password_exp).unix < moment().unix){
                throw new BadRequestException(['Reset password is expired'])
            }
            const newPassword = this.hash.crypt(password)
            await this.prisma.users.update({
                data: {
                    password: newPassword,
                    forgot_password_exp: null,
                    forgot_password_code: null,
                }, 
                where: {id: user.id}
            })
            return this.handle.response(200, "Success reset password please to try login", {})
        } catch (error) {
            throw error
        }
    }
}
