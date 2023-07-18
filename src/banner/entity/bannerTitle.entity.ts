import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banner_titles {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  banner_title: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  published_at: Date | null
}