import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    // Extract sprint id (if provided) and resolve related entities if necessary
    // Assume createTaskDto.sprint is the sprint ID (number)
    const taskData: any = { ...createTaskDto };
    if (createTaskDto.sprint) {
      // If you want to assign only the sprint id, you can do this:
      taskData.sprint = { id: createTaskDto.sprint };
    }
    return this.tasksRepository.save(taskData);
  }

  findAll() {
    return this.tasksRepository.find({
      relations: ['taskFor', 'taskOf', 'sprint'], // Include sprint relation
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['taskFor', 'taskOf', 'sprint'], // Include sprint relation
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }

  async findAllTasksForUser(taskSearchDto: { userId: number; projectId: number }) {
    const { userId, projectId } = taskSearchDto;
    return this.tasksRepository.find({
      where: {
        taskFor: { id: userId },
        taskOf: { id: projectId },
      },
      relations: ['taskFor', 'taskOf', 'sprint'],
      order:{
        createdAt: 'DESC',
      }
    });
  }
}