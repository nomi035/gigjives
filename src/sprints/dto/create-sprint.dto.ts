import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateSprintDto {
  @ApiProperty({ description: 'Name of the sprint' })
  sprintName: string;

  @ApiProperty({ description: 'Description of the sprint' })
  SprintDescription: string;

  @ApiPropertyOptional({ description: 'Start date of the sprint', type: String, format: 'date-time' })
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date of the sprint', type: String, format: 'date-time' })
  endDate?: Date;

  @ApiProperty({
    description: 'ID of the project the sprint belongs to',
    required: false,
  })
  project?: Project;

  @ApiProperty({
    description: 'Array of user IDs assigned to this sprint',
    required: false,
  })
  assignedTo?: User[];

  @ApiProperty({
    description: 'ID of the user managing this sprint',
    required: false,
  })
  managedBy?: User;
}