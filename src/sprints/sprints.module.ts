import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprints } from './entities/sprint.entity';
import { UserModule } from 'src/user/user.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [SprintsController],
  providers: [SprintsService],
  imports:[TypeOrmModule.forFeature([Sprints])], 
  
})
export class SprintsModule {}
