import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity()
export class visimisis {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  visi: string

  @Column()
  misi: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  published_at: Date | null
}