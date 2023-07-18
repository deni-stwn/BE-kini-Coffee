import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  phonenumber: string

  @Column()
  message: string
  
  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  published_at: Date | null

  @Column()
  created_by_id: number
  
  @Column()
  updated_by_id: number
}