import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleService } from 'src/helper/handle/handle.service';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService,
        private handle: HandleService
    ){}

    async isFound(id){
        try {
            const comment = await this.prisma.comments.findOne({where: {id: id}})
            return comment
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async isOwner(comment, userId){
        try {
            return comment.userId == userId
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async comment(where){
        try {
            const isFound = await this.isFound(where.id)
            if(!isFound){
                throw new NotFoundException(['Comment not found']);
            }
            return this.handle.response(200, "Success", isFound)
        } catch (error) {
            throw error
        }
    }

    async comments(where){
        try {
            const comments = await this.prisma.comments.findMany({where: where})
            return this.handle.response(200, "Success", comments)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async createComment(data){
        try {
            const comments = await this.prisma.comments.create({data})
            return this.handle.response(200, "Success", comments)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async updateComment(input){
        try {
            const {data, where} = input
            const isFound = await this.isFound(where.id)
            if(!isFound){
                throw new NotFoundException(['Comment not found']);
            }
            const isOwner = await this.isOwner(isFound, where.userId)
            if(!isOwner){
                throw new UnauthorizedException(['Unauthorized'])
            }
            const comments = await this.prisma.comments.update({data, where})
            return this.handle.response(200, "Success", comments)
        } catch (error) {
            throw error
        }
    }


    async deleteComment(input){
        try {
            const {where} = input
            const isFound = await this.isFound(where.id)
            if(!isFound){
                throw new NotFoundException(['Comment not found']);
            }
            const isOwner = await this.isOwner(isFound, where.userId)
            if(!isOwner){
                throw new UnauthorizedException(['Unauthorized'])
            }
            const comments = await this.prisma.comments.delete({where})
            return this.handle.response(200, "Success", comments)
        } catch (error) {
            throw error
        }
    }


}
