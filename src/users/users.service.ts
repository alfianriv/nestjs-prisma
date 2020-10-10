import { Injectable, BadRequestException } from '@nestjs/common';
import { usersWhereUniqueInput, usersCreateInput, usersUpdateInput } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleService } from 'src/helper/handle/handle.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private handle: HandleService,
    ){}

    async getUser(search: usersWhereUniqueInput){
        try {
            const user = await this.prisma.users.findOne({select: {id: true, fullname: true, email: true},where: search})
            return this.handle.response(200, "Success", user)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async updateUser(where: usersWhereUniqueInput, data: usersUpdateInput){
        try {
            const user = await this.prisma.users.update({select: {id: true, fullname: true, email: true}, data, where})
            return this.handle.response(200, "Success", user)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }
}
