import { BaseEntity } from 'base.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('Sprints')
export class Sprints extends BaseEntity {
  @Column()
  sprintName: string;

  @Column()
  SprintDescription: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  project: Project;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  assignedTo: User[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  managedBy: User;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
