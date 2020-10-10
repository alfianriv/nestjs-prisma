import { Controller, Get, UseGuards, Req, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostCreateValidationPipe } from './pipes/post_create.validation.pipe';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ){}

    @Get()
    @UseGuards(AuthGuard())
    posts(){
        return this.postsService.posts()
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    post(@Param('id') id: string){
        return this.postsService.post(Number(id))
    }

    @Post()
    @UseGuards(AuthGuard())
    createPost(@Body(new PostCreateValidationPipe()) data, @Req() req){
        data = {...data, userId: req.user.id}
        return this.postsService.create(data)
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    updatePost(@Param('id')id: string, @Body(new PostCreateValidationPipe()) data, @Req() req){
        return this.postsService.update({data, where: {id: Number(id), userId: Number(req.user.id)}})
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deletePost(@Param('id') id: string, @Req() req){
        return this.postsService.delete({id: Number(id), userId: req.user.id})
    }
}
