import { Controller, Get, Param, Body, Post, UseGuards, Req, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentCreateValidationPipe } from './pipes/comment_create.validation.pipe';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ){}

    @Get(':/id')
    getComment(@Param('id') id: string){
        return this.commentsService.comment({where: {id: Number(id)}});
    }

    @Get()
    getComments(@Body('post') id: string){
        return this.commentsService.comment({where: {postId: Number(id)}});
    }

    @Post()
    @UseGuards(AuthGuard())
    createComment(@Body(new CommentCreateValidationPipe()) data, @Req() req){
        return this.commentsService.createComment({...data, userId: req.user.id});
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    updateComment(@Param() id: string, @Body(new CommentCreateValidationPipe()) data, @Req() req){
        return this.commentsService.updateComment({...data, id: Number(id), userId: req.user.id});
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteComment(@Param() id: string, @Req() req){
        return this.commentsService.deleteComment({id: Number(id), userId: req.user.id});
    }
}
