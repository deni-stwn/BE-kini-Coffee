import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('kini_coffee_articles')
export class Kini_coffee_articles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({type: 'text'})
  content: string
  
  @Column()
  created_at?: Date

  @Column()
  updated_at?: Date

  @Column({ nullable: true })
  published_at?: Date | null


}