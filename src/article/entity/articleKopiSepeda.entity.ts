import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Kopi_sepeda_articles {
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

  // @BeforeInsert()
  // generateId() {
  //   this.id = uuidv4()
  // }
}