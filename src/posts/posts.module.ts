import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleService } from 'src/helper/handle/handle.service';

@Module({
  imports: [AuthModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, HandleService]
})
export class PostsModule {}
