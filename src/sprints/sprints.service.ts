import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprints } from './entities/sprint.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprints)
    private readonly sprintsRepository: Repository<Sprints>,
  ) {}

  async create(createSprintDto: CreateSprintDto) {
    const sprint = this.sprintsRepository.create({
      sprintName: createSprintDto.sprintName,
      SprintDescription: createSprintDto.SprintDescription,
      startDate: createSprintDto.startDate,
      endDate: createSprintDto.endDate,
    });

   
    
    

    return await this.sprintsRepository.save(sprint);
  }

  async findAll(): Promise<Sprints[]> {
    return this.sprintsRepository.find({
      relations: ['project', 'assignedTo', 'managedBy', 'tasks'],
      order: { startDate: 'DESC' }, 
    });
  }

  async findOne(id: number): Promise<Sprints> {
    const sprint = await this.sprintsRepository.findOne({
      where: { id },
      relations: ['project', 'assignedTo', 'managedBy', 'tasks'],
    });
    if (!sprint) throw new NotFoundException('Sprint not found');
    return sprint;
  }

  async update(id: number, updateSprintDto: UpdateSprintDto) {
    const sprint = await this.sprintsRepository.findOne({ where: { id } });
    if (!sprint) throw new NotFoundException('Sprint not found');
    return this.sprintsRepository.update(id,updateSprintDto)

    

    // if (updateSprintDto.project) {
    //   sprint.project = await this.projectsService.findOne(updateSprintDto.project);
    // }
    // if (updateSprintDto.managedBy) {
    //   sprint.managedBy = await this.userService.findOne(updateSprintDto.managedBy);
    // }
    // if (updateSprintDto.assignedTo?.length) {
    //   sprint.assignedTo = await this.userService.findByIds(updateSprintDto.assignedTo);
    // }

    
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sprintsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Sprint not found');

    return { message: 'Sprint deleted successfully' };
  }
}