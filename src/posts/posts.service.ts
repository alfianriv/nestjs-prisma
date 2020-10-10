import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleService } from 'src/helper/handle/handle.service';
import { postsCreateInput, postsWhereUniqueInput } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(
        private prisma: PrismaService,
        private handle: HandleService,
    ){}

    async isFound(id){
        try {
            const post = await this.prisma.posts.findOne({where: {id: id}})
            return post
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async isOwner(post, userId){
        try {
            return post.userId == userId
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async posts(){
        try {
            const posts = await this.prisma.posts.findMany()
            return this.handle.response(200, 'Success', posts)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async post(id){
        try {
            const post = await this.isFound(id)
            if(!post){
                throw new NotFoundException(['Post not found']);
            }
            return this.handle.response(200, 'Success', post)
        } catch (error) {
            throw error
        }
    }

    async create(data: postsCreateInput){
        try {
            const post = await this.prisma.posts.create({data})
            return this.handle.response(200, 'Success', post)
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    async update(input : {data: postsCreateInput, where}){
        try {
            const {data, where} = input
            const isFound = await this.isFound(where.id)
            if(!isFound){
                throw new NotFoundException(['Post not found']);
            }
            const isOwner = await this.isOwner(isFound, where.userId)
            if(!isOwner){
                throw new UnauthorizedException(['Post not found']);
            }
            const post = await this.prisma.posts.update({data, where: {id: where.id}})
            return this.handle.response(200, 'Success', post)
        } catch (error) {
            throw error
        }
    }
    
    async delete(where){
        try {
            const {id, userId} = where
            const isFound = await this.isFound(id)
            if(!isFound){
                throw new NotFoundException(['Post not found']);
            }
            const isOwner = await this.isOwner(isFound, userId)
            if(!isOwner){
                throw new UnauthorizedException(['Unauthorized']);
            }
            await this.prisma.posts.delete({where: {id}})
            return this.handle.response(200, 'Success', {})
        } catch (error) {
            throw error
        }
    }
}
