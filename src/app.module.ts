import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HandleService } from './helper/handle/handle.service';
import { AuthModule } from './auth/auth.module';
import { HashService } from './helper/hash/hash.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), PostsModule, CommentsModule],
  providers: [HandleService, HashService],
})
export class AppModule {}
