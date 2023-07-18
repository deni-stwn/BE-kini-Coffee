import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Abouts {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  created_at?: Date

  @Column()
  updated_at?: Date

  @Column({ nullable: true })
  published_at?: Date | null
}
